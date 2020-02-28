import METRIC_FORMATS from './metric-formats.constant';

const STATS = [
	{
		id: 'loadTime',
		label: 'Load Time',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 10000,
		error: 15000
	},
	{
		id: 'fullyLoaded',
		label: 'Full Load Time',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 20000,
		error: 25000
	},
	{
		id: 'TTFB',
		label: 'First Byte',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 100,
		error: 200
	},
	{
		id: 'cpu.Idle',
		label: 'First CPU Idle',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 15000,
		error: 20000
	},
	{
		id: 'firstPaint',
		label: 'First Paint',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 3000,
		error: 5000
	},
	{
		id: 'firstContentfulPaint',
		label: 'First Contentful Paint',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 5000,
		error: 7500
	},
	{
		id: 'SpeedIndex',
		label: 'Speed Index',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 7500,
		error: 10000
	},
	{
		id: 'render',
		label: 'Render',
		format: METRIC_FORMATS.UNIT.TIME,
		warning: 4500,
		error: 6000
	},
	{
		id: 'requestsDoc',
		label: '# Requests',
		format: METRIC_FORMATS.UNIT.COUNT,
		warning: 100,
		error: 120
	},
	{
		id: 'requestsFull',
		label: '# Requests with Tealium',
		format: METRIC_FORMATS.UNIT.COUNT,
		warning: 200,
		error: 250
	}
];

export default STATS;
