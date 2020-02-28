import APP from '../constants/app.constant';

const request = require('request');

export class Location {
	constructor() {}

	findLocations() {
		request(
			`http://www.webpagetest.org/getLocations.php?f=json&k=${APP.API_KEY}`,
			{ json: true },
			(err, res, body) => {
				if (err) {
					return console.log(err);
				}
				console.log(body.url);
				console.log(body.explanation);
			}
		);
	}
}
