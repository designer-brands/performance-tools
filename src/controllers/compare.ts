/*
import WPT_OPTIONS from '../constants/wpt-options.constant';
import STATS from '../constants/stats.constant';
import METRIC_FORMATS from '../constants/metric-formats.constant';

const WebPageTest = require('WebPageTest');
const wpt = new WebPageTest('https://www.webpagetest.org/', 'A.eb216c1ddff7f813701dcc9ec5b81ce5');
//import AsciiTable from 'ascii-data-table'

const ResultsModel = require('./models/results.model');

const TEST_URL = 'https://www.perf1.dswprf1.com';
const CONTROL_URL = 'https://www.qa2.dswq1.com';

const results = new ResultsModel();

function initRuns() {
	console.log(`CONTROL Run started for: ${CONTROL_URL}`);
	wpt.runTest(CONTROL_URL, WPT_OPTIONS, (err, result) => {
		results.controlRun.id = result.data.testId;
		console.log(`CONTROL Run ID: ${results.controlRun.id}`);

		const controlInterval = setInterval(() => {
			wpt.getTestStatus(results.controlRun.id, (err, result) => {
				console.log(`CONTROL Run Status: ${result.statusCode}: ${result.statusText}`);

				if (result.statusCode === 200) {
					console.log(`CONTROL Run Completed for ${CONTROL_URL}`);
					clearInterval(controlInterval);

					wpt.getTestResults(results.controlRun.id, (err, result) => {
						results.controlRun.rawData = result.data.average.firstView;
						results.controlRun.complete = true;
					});
				}
			});
		}, 10000);
	});

	console.log(`TEST Run started for ${TEST_URL}`);
	wpt.runTest(TEST_URL, WPT_OPTIONS, (err, result) => {
		results.testRun.id = result.data.testId;
		console.log(`TEST Run ID: ${results.testRun.id}`);

		const controlInterval = setInterval(() => {
			wpt.getTestStatus(results.testRun.id, (err, result) => {
				console.log(`TEST Run Status: ${result.statusCode}: ${result.statusText}`);

				if (result.statusCode === 200) {
					console.log(`TEST Run Completed for ${CONTROL_URL}`);
					clearInterval(controlInterval);

					wpt.getTestResults(results.testRun.id, (err, result) => {
						console.log(result);
						results.testRun.rawData = result.data.average.firstView;
						results.testRun.complete = true;
					});
				}
			});
		}, 10000);
	});

	pollForResults();
}

function pollForResults() {
	const pollingInterval = setInterval(() => {
		if (results.readyForProcessing()) {
			console.log('Both runs complete.');
			clearInterval(pollingInterval);

			parseResults();

			results.printTable();

			if (results.allPassed()) {
				process.exit();
			} else {
				process.exit(1);
			}
		}
	}, 5000);
}

function parseResults() {}

initRuns();
*/
