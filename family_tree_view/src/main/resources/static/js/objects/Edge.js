class Edge {
	constructor(id, from, to, parentId, description, dashes) {
		this.id = id;
		this.from = from;
		this.to = to;
		this.arrows = 'to';
		this.parentId = parentId;
		this.dashes = dashes;
		this.description = description;
	}
}

export default Edge

export function changeTypeEdge(edge, dashes) {
	return new Edge( edge.id, edge.from, edge.to, edge.parentId, edge.description, dashes);
}

export function cloneEdge(edge) {
	return new Edge( edge.id, edge.from, edge.to, edge.parentId, edge.description, edge.dashes);
}