// import {
// 	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
// } from '../constants/Adding'
import {
	CREATE_FAMILY, CREATE_PERSON, CREATE_PERSON_MODAL, CLOSE_PERSON_MODAL
} from '../constants/Modal'

import {
	MARRIGE_RELATION, CHILD_RELATION
} from '../constants/Tree'

import Person from '../objects/Person'
import Edge from '../objects/Edge'
import Node from '../objects/Node'

let initialTree = {
	isEmpty: false,
	activeNodeId: -1,
	nodes: [
		new Node(
			0,
			new Person(null,  'Владимир', 'Галкин', '05/06/1930', '06/11/1995'),
			new Person(1, 'Маргарита', 'Галкина', '26/12/1944', ' ... ')
		),
		new Node(
			1,
			new Person(3, 'Сергей', 'Галкин', '19/09/1960', ' ... '),
			new Person(4, 'Оксана', 'Галкина', '26/05/1970', ' ... ')
		),
		new Node(
			2,
			new Person( 5, 'Александр', 'Галкин', '06/01/1992', ' ... '),
			null
		),
		new Node(
			3,
			new Person(6, 'Вася', 'Пупкин', '19/09/1965', ' ... '),
			null
		)
	],
	edges: [
		new Edge(0, 0, 1, 'to'),
		new Edge(1, 0, 3, 'to'),
		new Edge(2, 1, 2, 'to')
	]
};
let initialState = {
	isCreated: true,
	familyName: 'Галкиных',
	description: 'Моя',
	tree: initialTree,
	isFetching: false,
	modalIsOpen: false
};

const tree = (state, action) => {
	switch (action.type) {
	case CREATE_PERSON_MODAL:
		return Object.assign({},
			state,
			{activeNodeId: action.nodeId}
		);
	case CLOSE_PERSON_MODAL:
		return Object.assign({},
			state,
			{activeNodeId: -1}
		);
	case CREATE_PERSON:
		let nodes = [...state.nodes];
		switch (action.relationType) {
		case MARRIGE_RELATION:
			var curNode = nodes[state.activeNodeId];
			nodes[state.activeNodeId] = new Node(curNode.id, curNode.main, action.person);
			return Object.assign({},
				state,
				{nodes: nodes}
			);
		case CHILD_RELATION:
			let edges = [...state.edges];
			let node = new Node(nodes.length, action.person, null);
			let edge = new Edge(edges.length, state.activeNodeId, nodes.length, 'to');
			nodes[nodes.length] = node;
			edges[edges.length] = edge;
			return Object.assign({},
				state,
				{nodes: nodes},
				{edges: edges}
			);
		default:
			return state;
		}
		break;
	default:
		return state;
	}
};

const family = (state = initialState, action) => {
	switch(action.type) {
	case CREATE_PERSON_MODAL:
		return Object.assign({},
			state,
			{tree: tree(state.tree, action),
			modalIsOpen: true}
		);
	case CLOSE_PERSON_MODAL:
		return Object.assign({},
			state,
			{tree: tree(state.tree, action),
			modalIsOpen: false
		});
	case CREATE_FAMILY:
		return Object.assign({}, state, {
			isCreated: true,
			familyName: action.familyName,
			description: action.description
		});
	case CREATE_PERSON:
		return Object.assign({}, state, {
			tree: tree(state.tree, action)
		});
	default:
		return state;
	}
};

export default family;