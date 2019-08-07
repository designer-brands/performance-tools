const WebPageTest = require("WebPageTest");
const wpt = new WebPageTest('https://www.webpagetest.org/', 'A.f6c1b97d7834d0869f2c223f4e75ced5');
//import AsciiTable from 'ascii-data-table'

const ResultsModel = require("./models/results.model");
const Metric = require("./models/metric.model");
const METRIC_FORMATS = require("./constants/metric-formats.constant");

const TEST_URL = "https://www.qa1.dswq1.com";
const CONTROL_URL = "https://www.qa2.dswq1.com";

const results = new ResultsModel();

const defaultWPTOptions = {
    connectivity: 'Cable',
    location: 'ec2-us-east-1',
    firstViewOnly: true,
    video: false,
    runs: 5,
    userAgent: 'chrome',
    emulateMobile: true,
    authenticationType: 0,
    login: 'qauser',
    password: 'Tested4quality!',
    lighthouse: false

};

const statsOfInterest = [
    'loadTime',
    'TTFB',
    'render',
    'SpeedIndex',
    'domElements',
    'requestsDoc',
    'bytesInDoc',
    'fullyLoaded',
    'requestsFull',
    'bytesIn'
];

const statsOfInterestLabels = [
    'Load Time (s)',
    'First Byte (s)',
    'Start Render (s)',
    'Speed Index (s)',
    'DOM Elements',
    '(Doc Complete) Request #',
    '(Doc Complete) Bytes In (KB)',
    '(Fully Loaded) Time (s)',
    '(Fully Loaded) Request #',
    '(Fully Loaded) Bytes In (KB)'
];

function initRuns() {

    console.log(`CONTROL Run started for: ${CONTROL_URL}`);
    wpt.runTest(CONTROL_URL, defaultWPTOptions, (err, result) => {

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
    wpt.runTest(TEST_URL, defaultWPTOptions, (err, result) => {

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

            console.log("Both runs complete.");
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

function parseResults() {

    for (let i = 0; i < statsOfInterest.length; i++) {

        let statID = statsOfInterest[i];
        let statLabel = statsOfInterestLabels[i];
        let statFormat = "";

        switch (statID) {
            case "loadTime":
            case "TTFB":
            case "render":
            case "SpeedIndex":
            case "fullyLoaded":
                statFormat = METRIC_FORMATS.UNIT.TIME;
                break;
            case "domElements":
            case "requestsDoc":
            case "requestsFull":
                statFormat = METRIC_FORMATS.UNIT.COUNT;
                break;

            case "bytesInDoc":
            case "bytesIn":
                statFormat = METRIC_FORMATS.UNIT.BYTES;
                break;
        }

        results.addMetric(statLabel, statFormat, statID);
    }

}

initRuns();