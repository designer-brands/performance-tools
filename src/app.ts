import { PerfTest } from './controllers/perf-test';
import Results from './models/results.model';

const { execSync } = require('child_process');
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');

program.option('--url <url>', 'The URL of the page we want to test');

program.parse(process.argv);

const opts = program.opts();

const questions = [
	{
		type: 'input',
		name: 'url',
		message: 'What is the URL being tested?',
		// only ask this question if banner is not provided or the provided banner is not valid
		when: () => !opts.url
	}
];

inquirer.prompt(questions).then(answers => {
	const resolvedOpts = Object.assign({}, opts, answers);
	const { url } = resolvedOpts;

	const perfTest = new PerfTest(url);

	perfTest.run().then((results: Results) => {
		results.printTable();
	});
});
