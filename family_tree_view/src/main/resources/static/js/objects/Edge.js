class Edge {
	constructor(id, from, to, parentId, description) {
		this.id = id;
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
	return new Edge( edge.id, edge.from, edge.to, edge.parentId, edge.description);
}