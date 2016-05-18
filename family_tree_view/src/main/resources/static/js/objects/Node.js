import {createPerson} from './Person'

const FAKE = -1;

class Node {
	constructor(id, spouseId, descendant, spouses, spouseDescriptions, edgeIds) {

		this.id = id;
		this.descendant = descendant;
		this.spouses = spouses;
		this.shape = 'box';
		this.spouseId = spouses.length == 0 ? FAKE : (spouseId === FAKE ? 0 : spouseId);
		this.edgeIds = edgeIds;
		this.label = createLabel(this.descendant, this.spouseId < 0 ? null : this.spouses[this.spouseId]);
		this.spouseDescriptions = []
	}
	
	updatePerson(person) {
		if (person.id === this.descendant.id) {
			this.descendant = person;
		} else {
			this.spouses[this.spouseId]  = person;
		}
	}
	
	getSpouse() {
		return this.spouseId < 0 ? null : this.spouses[this.spouseId];
	}
	
	addEdge(edgeId, edge) {
		this.edgeIds.push(edgeId);
		edge.dashes = edge.parentId != this.spouseId;
	}
}

export default Node

let createLabel = (p1, p2) => {
	let res = p1.surname + ' ' + p1.name +' (' + p1.birthday + ' - ' + p1.deathday + ')';
	if (p2 == null)
		return res;
	return res + '\n' + p2.surname + ' ' + p2.name +' (' + p2.birthday + ' - ' + p2.deathday + ')'
};

export function createNode(node, person) {
	let spouses  = [];
	for (var i = 0; i < node.spouses.length; i++) {
		spouses[i] = createPerson(node.spouses[i]);
	}
	if (person) {
		if (person.id == node.descendant.id) {
			return new Node(node.id, node.spouseId, person, spouses, node.spouseDescriptions, node.edgeIds);
		} else {
			for (i = 0; i < node.spouses.length; i++) {
				if (node.spouses[i].id == person.id) {
					node.spouses[i] = person;
					break;
				}
			}
		}
		return new Node(node.id, node.spouseId, createPerson(node.descendant), spouses.map(per => {
			if (per.id == person.id)
				return person;
			else
				return per;
		}), node.spouseDescriptions, node.edgeIds);
	} else {
		return new Node( node.id, node.spouseId, createPerson(node.descendant), spouses, node.spouseDescriptions, node.edgeIds);
	}
}

export function addSpouse(node, spouse) {
	let spouses = [];
	for (var i = 0; i < node.spouses.length; i++) {
		spouses[i] = createPerson(node.spouses[i]);
	}
	spouses[i] = createPerson(spouse);
	return new Node(node.id, node.spouseId, createPerson(node.descendant), spouses, node.spouseDescriptions, node.edgeIds);
}