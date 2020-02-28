import METRIC_FORMATS from '../constants/metric-formats.constant';

const chalk = require('chalk');

export default class Metric {
	public label: string;
	public value: number;

	readonly _format: string;
	readonly _warningValue: number;
	readonly _errorValue: number;

	constructor(label, format, value, warningValue, errorValue) {
		this.label = label;
		this._format = format;
		this.value = Math.floor(value);
		this._warningValue = warningValue;
		this._errorValue = errorValue;
	}

	get formattedValue() {
		if (this._format === METRIC_FORMATS.UNIT.TIME) {
			return `${this.value}ms`;
		} else {
			return this.value;
		}
	}

	get status() {
		let msg = chalk.green('OK');
		if (this._errorValue < this.value) {
			msg = chalk.red(`ERROR (>${this._errorValue})`);
		} else if (this._warningValue < this.value) {
			msg = chalk.yellow(`WARN (>${this._warningValue})`);
		}

		return msg;
	}
}
