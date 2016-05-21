class Edge {
	constructor(id, from, to, parentId, dashes) {
		this.id = id;
		this.from = from;
		this.to = to;
		this.arrows = 'to';
		this.parentId = parentId;
		this.dashes = dashes;
	}
}

export default Edge

export function changeTypeEdge(edge, dashes) {
	return new Edge( edge.id, edge.from, edge.to, edge.parentId, dashes);
}

export function cloneEdge(edge) {
	return new Edge( edge.id, edge.from, edge.to, edge.parentId, edge.dashes);
}