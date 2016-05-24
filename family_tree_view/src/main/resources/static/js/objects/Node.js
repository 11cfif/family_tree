import {clonePerson} from './Person'

const FAKE = -1;

class Node {
	constructor(id, spouseId, descendant, spouses, childRelations) {
		this.id = id;
		this.descendant = descendant;
		this.spouses = spouses;
		this.shape = 'box';
		this.spouseId = spouses.length == 0 ? FAKE : (spouseId === FAKE ? 0 : spouseId);
		this.childRelations = childRelations;
		this.label = createLabel(this.descendant, this.spouseId < 0 ? null : this.spouses[this.spouseId]);
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
		this.childRelations.push(edgeId);
		edge.dashes = edge.parentId != this.spouseId;
	}

	getSpousesFullName() {
		return this.descendant.getFullName() + ' и ' + this.getSpouse().getFullName();
	}
}

export default Node

let createLabel = (p1, p2) => {
	let res = p1.surname + ' ' + p1.name +' (' + p1.birthday + ' - ' + p1.deathday + ')';
	if (p2 == null)
		return res;
	return res + '\n' + p2.surname + ' ' + p2.name +' (' + p2.birthday + ' - ' + p2.deathday + ')';
};

export function createNode(node, person) {
	let spouses  = [];
	for (var i = 0; i < node.spouses.length; i++) {
		spouses[i] = clonePerson(node.spouses[i]);
	}
	if (person) {
		if (person.id == node.descendant.id) {
			return new Node(node.id, node.spouseId, person, spouses, node.childRelations);
		} else {
			for (i = 0; i < node.spouses.length; i++) {
				if (node.spouses[i].id == person.id) {
					node.spouses[i] = person;
					break;
				}
			}
		}
		return new Node(node.id, node.spouseId, clonePerson(node.descendant), spouses.map(per => {
			if (per.id == person.id)
				return person;
			else
				return per;
		}), node.childRelations);
	} else {
		return new Node(node.id, FAKE, clonePerson(node.descendant), spouses, node.childRelations);
	}
}

export function addSpouse(node, spouse) {
	let spouses = cloneSpouses(node.spouses);
	spouses.push(clonePerson(spouse));
	return new Node(node.id, node.spouses.length, clonePerson(node.descendant),
		spouses, node.childRelations);
}

export function addEdge(node, edgeId) {
	return new Node(node.id, node.spouseId, clonePerson(node.descendant), 
		cloneSpouses(node.spouses), [...node.childRelations, edgeId]);
}

export function changeSpouse(node, spouseId) {
	return new Node(node.id, spouseId, clonePerson(node.descendant), cloneSpouses(node.spouses), node.childRelations);
}

function cloneSpouses(oldSpouses) {
	let spouses = [];
	for (var i = 0; i < oldSpouses.length; i++) {
		spouses[i] = clonePerson(oldSpouses[i]);
	}
	return spouses;
}