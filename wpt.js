const WebPageTest = require("WebPageTest");
const wpt = new WebPageTest('https://www.webpagetest.org/', 'A.f6c1b97d7834d0869f2c223f4e75ced5');
//import AsciiTable from 'ascii-data-table'

const TEST_URL = "https://www.qa1.dswq1.com";
const CONTROL_URL = "https://www.qa2.dswq1.com";

const results = {
    control: {
        complete: false
    },
    test: {
        complete: false
    }
};

const defaultWPTOptions = {
    connectivity: 'Cable',
    location: 'Dulles:Chrome',
    firstViewOnly: true,
    video: false,
    runs: 1,
    userAgent: 'chrome',
    emulateMobile: true,
    authenticationType: 0,
    login: 'qauser',
    password: 'Tested4quality!',
    lighthouse: true,
    notify: 'tonycontosta@dswinc.com',
    pollResults: 10

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

function startPerfTesting() {

    console.log(`Performance Analysis Started: ${TEST_URL}`);

    wpt.runTest(TEST_URL, defaultWPTOptions, (err, result) => {

        console.log(err, result);

        if (result && result.data) {
            console.log(`Performance Analysis Completed: ${TEST_URL}`);
            results.test.complete = true;

            const stats = result.data.average.firstView;

            statsOfInterest.forEach(stat => {
                results.test[stat] = stats[stat];
            });
        }
    });

    console.log(`Performance Analysis Started: ${CONTROL_URL}`);
    wpt.runTest(CONTROL_URL, defaultWPTOptions, (err, result) => {

        console.log(err, result);

        if (result && result.data) {
            console.log(`Performance Analysis Completed: ${CONTROL_URL}`);

            results.control.complete = true;

            const stats = result.data.average.firstView;

            statsOfInterest.forEach(stat => {
                results.control[stat] = stats[stat];
            });
        }
    });

    pollForResults();
}

function pollForResults() {
    const interval = setInterval(()=> {
        console.log("Checking for completion of both tests...");
        if (results.test.complete && results.control.complete) {

            console.log("COMPLETED!!!");

            clearInterval(interval);

            for (let i = 0; i < statsOfInterestLabels.length; i++) {

                const comparison = (stats.control[i] - stats.test[i]) / stats.control[i];
                console.log(`${statsOfInterestLabels[i]}: ${Math.round(comparison) * 100}%`);
            }

            //console.log('Waterfall view:', result.data.runs[1].firstView.images.waterfall);
        } else {
            console.log("Still working...");
        }
    }, 30000);
}

startPerfTesting();