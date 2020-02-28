export default class Metric {
	readonly _label: string;
	readonly _format: string;
	readonly _value: number;
	readonly _warningValue: number;
	readonly _errorValue: number;
	private _isPassing: any;

	constructor(label, format, value, warningValue, errorValue) {
		this._label = label;
		this._format = format;
		this._value = value;
		this._warningValue = warningValue;
		this._errorValue = errorValue;
		this._isPassing = false;
	}

	get label() {
		return this._label;
	}

	print() {
		return `${this.label}: ${this._value}`;
	}
}
