import METRIC_FORMATS from '../constants/metric-formats.constant';
import STATS from '../constants/stats.constant';
import Metric from '../models/metric.model';
import Run from '../models/run.model';

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
		this._metrics.forEach(metric => {
			console.log(metric.print());
		});
	}

	allPassed() {
		return (
			this._metrics.filter(metric => {
				return metric.isPassing();
			}).length === this._metrics.length
		);
	}
}
