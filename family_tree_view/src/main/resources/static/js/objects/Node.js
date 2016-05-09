var count = -1;

class Node {
	constructor(main, secondary, edgeIds) {
		this.id = ++count;
		this.main = main;
		this.secondary = secondary;
		this.shape = 'box';
		this.secondaryId = secondary.length == 0 ? -1 : 0;
		this.edgeIds = edgeIds;
		this.label = createLabel(this.main, this.secondary[this.secondaryId]);
	}
	
	addSecondaryPerson(person) {
		this.secondary.push(person);
		if (this.secondary.length == 1) {
			this.secondaryId = 0;
			this.label = createLabel(this.main, this.secondary[this.secondaryId])
		}
	}
	
	addEdge(edgeId, edge) {
		this.edgeIds.push(edgeId);
		edge.dashes = edge.parentId != this.secondaryId;
	}
	
	setSecondaryId(id, edges) {
		this.secondaryId = id;
		for (let i = 0; i < this.edgeIds.length; i++) {
			edges[this.edgeIds[i]].dashes = edges[i].parentId != id;
		}
		this.label = createLabel(this.main, this.secondary[id])
	}
}

export default Node

let createLabel = (p1, p2) => {
	let res = p1.surname + ' ' + p1.name +' (' + p1.birthday + ' - ' + p1.deathday + ')';
	if (p2 == null)
		return res;
	return res + '\n' + p2.surname + ' ' + p2.name +' (' + p2.birthday + ' - ' + p2.deathday + ')'
};