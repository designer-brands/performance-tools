export default class Run {
	public id = '';
	public url = '';
	public complete = false;
	public data: any;

	constructor(id: string) {
		this.id = id;
	}

	get firstView() {
		return this.data.average.firstView;
	}
}
