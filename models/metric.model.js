module.exports = class Metric {

    constructor(label, format, controlValue, testValue) {
        this._label = label;
        this._format = format;
        this._controlValue = controlValue;
        this._testValue = testValue;
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

    print() {
        const percent = (this._controlValue - this._testValue) / this._controlValue;
        const isPassing = (percent >= 0) ? "PASSING" : "FAILED";
        return `${this.label}: ${this._controlValue} | ${this._testValue} | ${Math.round(percent * 100)}% (${isPassing})`;
    }
}