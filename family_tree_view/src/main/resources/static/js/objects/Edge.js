var count = -1;

class Edge {
	constructor(from, to, parentId) {
		this.id = ++count;
		this.from = from;
		this.to = to;
		this.arrows = 'to';
		this.parentId = parentId;
		this.dashes = false;
	}
}

export default Edge