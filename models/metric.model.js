module.exports = class Metric {

    constructor(label, format, controlValue, testValue) {
        this._label = label;
        this._format = format;
        this._controlValue = controlValue;
        this._testValue = testValue;
        this._isPassing = false;
    }

    get label() {
        return this._label;
    }

    get format() {
        return this._format;
    }

    get controlValue() {
        return this._controlValue;
    }

    get testValue() {
        return this._testValue;
    }

    comparison() {
        return Math.round(((this._controlValue - this._testValue) / this._controlValue) * 100);
    }

    isPassing() {
        this._isPassing = this.comparison();
    }

    print() {
        const passingText = this.comparison() >= 0 ? "PASSING" : "FAILED";
        return `${this.label}: ${this._controlValue} | ${this._testValue} | ${this.comparison()}% (${passingText})`;
    }
}