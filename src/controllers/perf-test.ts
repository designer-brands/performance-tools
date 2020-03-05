import Results from '../models/results.model';
import Run from '../models/run.model';

const WebPageTest = require('WebPageTest');
const request = require('request-promise-native');

const APP_CONFIG = require('../app.config.json');

export class PerfTest {
	readonly _url: string;
	readonly _wpt;

	constructor(url) {
		this._url = url;
		this._wpt = new WebPageTest(APP_CONFIG.WPT_HOST, APP_CONFIG.API_KEY);
	}

	/**
	 * Returns locationID of the location with the least amount of tests running.
	 */
	getFastestLocation(): any {
		let fastestLocation = null;

		return request(`http://www.webpagetest.org/getLocations.php?f=json&k=${APP_CONFIG.API_KEY}`, { json: true })
			.then(response => {
				// filter list of locations to North America only and then pick the one with the fewest tests
				Object.values(response.data)
					.filter((location: any) => {
						// only use accepted locations
						if (APP_CONFIG.ACCEPTED_LOCATIONS.indexOf(location.location) >= 0) {
							return location;
						}
					})
					.forEach((acceptedLocation: any) => {
						console.log(
							`${acceptedLocation.location} has ${acceptedLocation.PendingTests.Total} total tests`
						);

						// check to see if we have a new location with fewer tests running
						if (!fastestLocation) {
							fastestLocation = acceptedLocation;
						} else if (acceptedLocation.PendingTests.Total < fastestLocation.PendingTests.Total) {
							fastestLocation = acceptedLocation;
						}
					});

				console.log(`Location with fewest tests running is ${fastestLocation.location}`);
				return fastestLocation.location;
			})
			.catch(err => {
				if (err) {
					console.log(`No locations found`);
					process.exit(5);
				}
			});
	}

	run() {
		return new Promise((resolve, reject) => {
			const results = new Results();

			this.getFastestLocation().then(locationId => {
				// replacing config location with fastest location id
				APP_CONFIG.WPT.location = APP_CONFIG.WPT.location.replace('##LOCATION_ID##', locationId);

				console.log(`Run started using location ${APP_CONFIG.WPT.location} for ${this._url}`);

				this._wpt.runTest(this._url, APP_CONFIG.WPT, (err, result) => {
					const testRun = new Run(result.data.testId);

					const checkRunStatus = setInterval(() => {
						this._wpt.getTestStatus(testRun.id, (statusErr, statusResult) => {
							console.log(`Run Status: ${statusResult.statusCode}: ${statusResult.statusText}`);

							if (statusResult.statusCode === 200) {
								console.log(`Run Completed for ${this._url}`);
								clearInterval(checkRunStatus);

								this._wpt.getTestResults(testRun.id, (runError, fullResults) => {
									testRun.url = this._url;
									testRun.data = fullResults.data;
									testRun.complete = true;

									results.addRun(testRun);
									results.parse();

									resolve(results);
								});
							}
						});
					}, APP_CONFIG.TEST_CHECK_INTERVAL);
				});
			});
		});
	}
}
