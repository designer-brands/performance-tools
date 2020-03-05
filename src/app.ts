import { PerfTest } from './controllers/perf-test';
import Results from './models/results.model';

const program = require('commander');
const inquirer = require('inquirer');
const APP_CONFIG = require('./app.config.json');

program.option('--url <url>', 'The URL of the page we want to test');

program.parse(process.argv);

const opts = program.opts();

function startTesting() {
	let pagesToTest = APP_CONFIG.PAGES;

	// override default pages to test if the user specifies a single URL
	if (opts.url) {
		pagesToTest = [opts.url];
	}

	pagesToTest.forEach(page => {
		const perfTest = new PerfTest(page);

		perfTest.run().then((results: Results) => {
			results.printTable();
		});
	});
}

startTesting();
