export default class Run {
	public id = '';
	public url = '';
	public complete = false;
	public rawData: {};

	constructor(id: string) {
		this.id = id;
	}
}
