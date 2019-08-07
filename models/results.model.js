const RunModel = require("./run.model");
const Metric = require("./metric.model");

module.exports = class Results {

    constructor() {
        this._controlRun = new RunModel();
        this._testRun = new RunModel();
        this._metrics = [];
        this._summaryUrl = "";
    }

    get controlRun() {
        return this._controlRun;
    }

    set controlRun(value) {
        this._controlRun = value;
    }

    get testRun() {
        return this._testRun;
    }

    set testRun(value) {
        this._testRun = value;
    }

    get metrics() {
        return this._metrics;
    }

    set metrics(value) {
        this._metrics = value;
    }

    get summaryUrl() {
        return this._summaryUrl;
    }

    set summaryUrl(value) {
        this._summaryUrl = value;
    }

    readyForProcessing() {
        return this._controlRun.complete && this._testRun.complete;
    }

    addMetric(label, format, id) {
        this._metrics.push(new Metric(label, format, this._controlRun.rawData[id], this._testRun.rawData[id]));
    }

    printTable() {
        this._metrics.forEach(metric => {
            console.log(metric.print());
        })
    }

    allPassed() {
        return this._metrics.filter(metric => {
            return metric.isPassing();
        }).length === this._metrics.length;
    }

}