import APP from '../constants/app.constant';
import WPT_OPTIONS from '../constants/wpt-options.constant';
import Results from '../models/results.model';
import Run from '../models/run.model';

const WebPageTest = require('WebPageTest');
const request = require('request-promise-native');

export class PerfTest {
	readonly _url = 'https://www.perf1.dswprf1.com';
	readonly _wpt;

	constructor(url) {
		this._url = url;
		this._wpt = new WebPageTest(APP.WPT_HOST, APP.API_KEY);
	}

	getFastestLocation(): any {
		let fastestLocation = null;

		return request(`http://www.webpagetest.org/getLocations.php?f=json&k=${APP.API_KEY}`, { json: true })
			.then(response => {
				// filter list of locations to North America only and then pick the one with the fewest tests
				Object.values(response.data)
					.filter((location: any) => {
						// only use accepted locations
						if (APP.ACCEPTED_LOCATIONS.indexOf(location.location) >= 0) {
							return location;
						}
					})
					.forEach((northAmLocation: any) => {
						console.log(
							`${northAmLocation.location} has ${northAmLocation.PendingTests.Total} total tests`
						);

						// check to see if we have a new location with fewer tests running
						if (!fastestLocation) {
							fastestLocation = northAmLocation;
						} else if (northAmLocation.PendingTests.Total < fastestLocation.PendingTests.Total) {
							fastestLocation = northAmLocation;
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
				WPT_OPTIONS.location = WPT_OPTIONS.location.replace('##LOCATION_ID##', locationId);

				console.log(`TEST Run started using location ${WPT_OPTIONS.location} for ${this._url}`);

				this._wpt.runTest(this._url, WPT_OPTIONS, (err, result) => {
					const testRun = new Run(result.data.testId);

					const checkRunStatus = setInterval(() => {
						this._wpt.getTestStatus(testRun.id, (err, result) => {
							console.log(`TEST Run Status: ${result.statusCode}: ${result.statusText}`);

							if (result.statusCode === 200) {
								console.log(`TEST Run Completed for ${this._url}`);
								clearInterval(checkRunStatus);

								this._wpt.getTestResults(testRun.id, (err, result) => {
									console.log(result);
									testRun.rawData = result.data.average.firstView;
									testRun.complete = true;

									results.addRun(testRun);
									results.parse();

									resolve(results);
								});
							}
						});
					}, 10000);
				});
			});
		});
	}
}
