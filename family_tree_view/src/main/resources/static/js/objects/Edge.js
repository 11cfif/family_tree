const FAKE = -1;

class Edge {
	constructor(from, to, parentId, description, id) {
		this.id = id ? id : FAKE;
		this.from = from;
		this.to = to;
		this.arrows = 'to';
		this.parentId = parentId;
		this.dashes = false;
		this.description = description;
	}
}

export default Edge

export function createEdge(edge) {
	return new Edge(edge.from, edge.to, edge.parentId, edge.description, edge.id);
}