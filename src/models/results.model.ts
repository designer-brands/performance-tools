import STATS from '../constants/stats.constant';
import Metric from '../models/metric.model';
import Run from '../models/run.model';

const AsciiTable = require('ascii-table');

export default class Results {
	private _run: Run;
	private _metrics = [];
	private _table;

	constructor() {}

	addRun(run: Run) {
		this._run = run;
	}

	parse() {
		STATS.forEach(stat => {
			this._metrics.push(
				new Metric(stat.label, stat.format, this._run.firstView[stat.id], stat.warning, stat.error)
			);
		});
	}

	printTable() {
		this._table = new AsciiTable(
			`Performance Results:\n${this._run.url}\n${this._run.data.testRuns} Runs ${this._run.data.connectivity} @ ${this._run.data.bwDown}Mbps and ${this._run.data.latency}ms latency`
		);
		this._table.setHeading('Statistic', 'Value', 'Status');

		this._metrics.forEach(metric => {
			this._table.addRow(metric.label, metric.formattedValue, metric.status);
		});

		console.log(this._table.toString());
	}
}
