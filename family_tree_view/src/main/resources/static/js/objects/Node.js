import {createPerson} from './Person'

const FAKE = -1;

class Node {
	constructor(descendant, spouses, spouseDescriptions, edgeIds, id) {
		this.id = id ? FAKE : id;
		this.descendant = descendant;
		this.spouses = spouses;
		this.shape = 'box';
		this.spouseId = spouses.length == 0 ? -1 : 0;
		this.edgeIds = edgeIds;
		this.label = createLabel(this.descendant, this.spouseId < 0 ? null : this.spouses[this.spouseId]);
		this.spouseDescriptions = []
	}
	
	addSpouse(spouse, description) {
		this.spouses.push(spouse);
		this.spouseDescriptions.push(description);
		if (this.spouses.length == 1) {
			this.spouseId = 0;
			this.label = createLabel(this.descendant, this.spouses[this.spouseId])
		}
	}
	
	addEdge(edgeId, edge) {
		this.edgeIds.push(edgeId);
		edge.dashes = edge.parentId != this.spouseId;
	}
	
	setSpouseId(id, edges) {
		this.spouseId = id;
		for (let i = 0; i < this.edgeIds.length; i++) {
			edges[this.edgeIds[i]].dashes = edges[this.edgeIds[i]].parentId != id;
		}
		this.label = createLabel(this.descendant, this.spouses[id])
	}
}

export default Node

let createLabel = (p1, p2) => {
	let res = p1.surname + ' ' + p1.name +' (' + p1.birthday + ' - ' + p1.deathday + ')';
	if (p2 == null)
		return res;
	return res + '\n' + p2.surname + ' ' + p2.name +' (' + p2.birthday + ' - ' + p2.deathday + ')'
};

export function createNode(node) {
	console.log('create Node ' + JSON.stringify(node, null, 2));
	let spouses  = [];
	for (var i = 0; i < node.spouses.length; i++) {
		spouses[i] = createPerson(node.spouses[i]);
	}
	return new Node(createPerson(node.descendant), spouses, node.spouseDescriptions, node.childRelation, node.id);
}