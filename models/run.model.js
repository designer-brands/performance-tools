module.exports = class Run {

    constructor() {
        this._id = "";
        this._complete = false;
        this._rawData = null;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get complete() {
        return this._complete;
    }

    set complete(value) {
        this._complete = value;
    }

    get rawData() {
        return this._rawData;
    }

    set rawData(value) {
        this._rawData = value;
    }
};