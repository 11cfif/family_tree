// import {
// 	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
// } from '../constants/Adding'
import {
	CREATE_FAMILY, CREATE_PERSON, SELECT_PERSON,
	CREATE_PERSON_CREATOR_MODAL, CREATE_PERSON_SELECTOR_MODAL, 
	CLOSE_PERSON_MODAL
} from '../constants/Modal'

import {
	MARRIGE_RELATION, CHILD_RELATION
} from '../constants/Tree'

import Person from '../objects/Person'
import Edge from '../objects/Edge'
import Node from '../objects/Node'

var init = false;

let initialTree = {
	isEmpty: false,
	activeNodeId: -1,
	nodes: [
		new Node(
			new Person('Владимир', 'Галкин', '05/06/1930', '06/11/1995'),
			[new Person('Маргарита', 'Галкина', '26/12/1944', ' ... ')],
			[]
		),
		new Node(
			new Person('Сергей', 'Галкин', '19/09/1960', ' ... '),
			[new Person('Оксана', 'Галкина', '26/05/1970', ' ... ')],
			[]
		),
		new Node(
			new Person('Александр', 'Галкин', '06/01/1992', ' ... '),
			[],
			[]
		),
		new Node(
			new Person('Вася', 'Пупкин', '19/09/1965', ' ... '),
			[],
			[]
		)
	],
	edges: [
		new Edge(0, 1, 2),
		new Edge(0, 3, 2),
		new Edge(1, 2, 3)
	]
};
let initialState = {
	isCreated: true,
	familyName: 'Галкиных',
	description: 'Моя',
	tree: initialTree,
	isFetching: false,
	personCreatorIsOpen: false,
	personSelectorIsOpen: false
};

const treeF = (state, action) => {
	let nodes;
	let edges;
	let curNode;
	switch (action.type) {
	case CREATE_PERSON_SELECTOR_MODAL:
			return Object.assign({}, state, {
				activeNodeId: action.nodeId
			});
	case CLOSE_PERSON_MODAL:
		return Object.assign({}, state, {
			activeNodeId: -1
		});
	case CREATE_PERSON:
		nodes = [...state.nodes];
		switch (action.relationType) {
		case MARRIGE_RELATION:
			curNode = nodes[state.activeNodeId];
			console.log('1 cur= ' + JSON.stringify(curNode, null, 4));
			console.log('1 per= ' + JSON.stringify(action.person, null, 4));
			curNode.addSecondaryPerson(action.person);
			return Object.assign({}, state, {
				nodes: nodes
			});
		case CHILD_RELATION:
			let node = new Node(action.person, [], []);
			let edge = new Edge(state.activeNodeId, node.id, nodes[state.activeNodeId].secondaryId);
			edges = [...state.edges, edge];
			nodes.push(node);
			nodes[state.activeNodeId].addEdge(edges.length - 1, edge);
			return Object.assign({}, state, {
				nodes: nodes,
				edges: edges
			});
		default:
			return state;
		}
		break;
	case SELECT_PERSON:
		nodes = [...state.nodes];
		edges = [...state.edges];
		curNode = nodes[state.activeNodeId];
		curNode.setSecondaryId(action.id, edges);
		return Object.assign({}, state, {
			nodes: nodes,
			edges: edges
		});
	default:
		return state;
	}
};

const family = (state = initialState, action) => {
	console.log('red state = ' + JSON.stringify(state, null, 4))
	console.log('red action = ' + JSON.stringify(action, null, 4))
	let tree = state.tree;
	if (!init) {
		for (let i = 0; i < tree.edges.length; i++) {
			tree.nodes[tree.edges[i].from].addEdge(i, tree.edges[i])
		}
		init = true;
	}
	switch(action.type) {
		case CREATE_PERSON_SELECTOR_MODAL:
			return Object.assign({}, state, {
				tree: treeF(tree, action),
				personSelectorIsOpen: true
			});
		case CREATE_PERSON_CREATOR_MODAL:
			return Object.assign({}, state, {
				tree: treeF(tree, action),
				personSelectorIsOpen: false,
				personCreatorIsOpen: true
			});
		case CLOSE_PERSON_MODAL:
			return Object.assign({}, state, {
				tree: treeF(tree, action),
				personCreatorIsOpen: false,
				personSelectorIsOpen: false
			});
		case CREATE_FAMILY:
			return Object.assign({}, state, {
				isCreated: true,
				familyName: action.familyName,
				description: action.description
			});
		case CREATE_PERSON:
		case SELECT_PERSON:
			return Object.assign({}, state, {
				tree: treeF(tree, action)
			});
		default:
			return state;
	}
};

export default family;