const lighthouse = require('lighthouse');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const fs = require('fs');

const chromeLauncher = require('chrome-launcher');
const args = require('minimist')(process.argv.slice(2));

function launchChromeAndRunLighthouse(url, flags, config = null) {
    return chromeLauncher.launch({chromeFlags: flags.chromeFlags}).then(chrome => {
        flags.port = chrome.port;
        return lighthouse(url, flags, config).then(results => {
            // use results.lhr for the JS-consumeable output
            // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
            // use results.report for the HTML/JSON/CSV output as a string
            // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
            return chrome.kill().then(() => results)
        });
    });
}

const flags = {
    //chromeFlags: ['--show-paint-rects'],
    output: 'html',
    chromeFlags: ['--headless'],
    logLevel: 'info',
    onlyCategories: ['performance'],
    view: true
};

// Usage:
launchChromeAndRunLighthouse(args.url, flags).then(results => {

    fs.writeFile("report.html", results.report, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    chromeLauncher.launch({startingUrl: 'report.html'}).then(chrome => {
        console.log("Displaying report.....");
    });
});