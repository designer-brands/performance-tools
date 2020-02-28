import STATS from '../constants/stats.constant';
import Metric from '../models/metric.model';
import Run from '../models/run.model';

const AsciiTable = require('ascii-table');

export default class Results {
	private _run: Run;
	private _metrics = [];

	constructor() {}

	addRun(run: Run) {
		this._run = run;
	}

	readyForProcessing() {
		return this._run.complete && this._run.complete;
	}

	parse() {
		STATS.forEach(stat => {
			this._metrics.push(
				new Metric(stat.label, stat.format, this._run.rawData[stat.id], stat.warning, stat.error)
			);
		});
	}

	printTable() {
		const table = new AsciiTable('Performance Results');

		table.setHeading('Statistic', 'Value', 'Status');

		this._metrics.forEach(metric => {
			table.addRow(metric.label, metric.formattedValue, metric.status);
		});

		console.log(table.toString());
	}

	allPassed() {
		return (
			this._metrics.filter(metric => {
				return metric.isPassing();
			}).length === this._metrics.length
		);
	}
}
