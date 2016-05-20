import {
	CREATE_PERSON, SELECT_PERSON, CREATE_NODE_MODAL
} from '../constants/Modal'

import {
	RESPONSE_LOAD_FAMILY, INVALID_LOAD_FAMILY,
	POST_FAMILY, RESPONSE_FAMILY, INVALID_FAMILY,
	LOADING_FAMILIES
} from '../constants/Family'

import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON,
	POST_SPOUSE, RESPONSE_SPOUSE, INVALID_SPOUSE,
	POST_CHILD, RESPONSE_CHILD, INVALID_CHILD,
	CHANGE_SPOUSE
} from '../constants/Person'

import {createFamilyInfo} from '../objects/FamilyInfo'
import Node, {createNode, addSpouse, addEdge, changeSpouse} from '../objects/Node'
import {clonePerson} from '../objects/Person'
import Edge, {changeTypeEdge, cloneEdge} from '../objects/Edge'

let initialTree = {
	activeNodeId: -1,
 	nodes: null,
	edges: null
};
let initialState = {
	familyInfo: null,
	tree: initialTree
};

const node = (state, action, activeNode, edgesLength) => {
	switch (action.type) {
	case RESPONSE_PERSON:
		if (activeNode != state.id)
			return state;
		return createNode(state, action.person);
	case RESPONSE_SPOUSE:
		if (activeNode != state.id)
			return state;
		return addSpouse(state, action.spouse);
	case RESPONSE_CHILD:
		if (activeNode != state.id)
			return state;
		return addEdge(state, edgesLength);
	case CHANGE_SPOUSE:
		if (activeNode != state.id)
			return state;
		return changeSpouse(state, action.spouseId)
	}
};

const treeF = (state, action) => {
	switch (action.type) {
	case RESPONSE_LOAD_FAMILY: {
		return Object.assign({},
			state,
			{nodes: action.nodes},
			{edges: action.edges}
		);
	}
	case CREATE_NODE_MODAL:
		return Object.assign({}, state, {
			activeNodeId: action.node.id
		});
	case RESPONSE_FAMILY:
		return Object.assign({}, state, {
			nodes: action.nodes,
			edges: action.edges
		});
	case RESPONSE_PERSON:
		return Object.assign({}, state, {
			nodes: state.nodes.map(n => node(n, action, state.activeNodeId))
		});
	case RESPONSE_SPOUSE:
		return Object.assign({}, state, {
			nodes: state.nodes.map(n => node(n, action, state.activeNodeId))
		});
	case RESPONSE_CHILD:
		var activeNode = state.nodes[state.activeNodeId];
		var nodes = state.nodes.map(n => node(n, action, state.activeNodeId, state.edges.length));
		nodes.push(new Node(state.nodes.length, activeNode.getSpouse().id, clonePerson(action.child), [], [], []));
		return Object.assign({}, state, {
			nodes: nodes,
			edges: [...
				state.edges,
				new Edge(state.edges.length, state.activeNodeId, state.nodes.length, activeNode.getSpouse().id, '', false)
			]
		});
	case CHANGE_SPOUSE:
		nodes = state.nodes.map(n => node(n, action, state.activeNodeId));
		let edges = [];
		activeNode = nodes[state.activeNodeId];
		for (var i = 0; i < state.edges.length; i++) {
			const edge = state.edges[i];
			if (activeNode.childRelations.some(item => item == edge.id)) {
				edges.push(changeTypeEdge(edge, edge.parentId != activeNode.spouses[activeNode.spouseId].id))
			} else {
				edges.push(cloneEdge(edge))
			}
		}
		return Object.assign({}, state, {
			nodes: nodes,
			edges: edges
		});
	default:
		return state;
	}
};

const family = (state = initialState, action) => {
	let tree = state.tree;
	switch (action.type) {
	case LOADING_FAMILIES: 
		return initialState;
	case CREATE_NODE_MODAL:
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case RESPONSE_FAMILY:
		return Object.assign({}, state, {
			familyInfo: action.familyInfo,
			tree: treeF(tree, action)
		});
	case RESPONSE_PERSON:
		if (state.familyInfo.head.id == action.person.id) {
			let familyInfo = createFamilyInfo(state.familyInfo, action.person);
			return Object.assign({}, state, {
				familyInfo: familyInfo,
				tree: treeF(tree, action)
			});
		}
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case RESPONSE_SPOUSE:
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case RESPONSE_CHILD:
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case CHANGE_SPOUSE:
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case RESPONSE_LOAD_FAMILY: {
		return Object.assign({},
			state,
			{familyInfo: action.familyInfo},
			{tree: treeF(tree, action)}
		);
	}
	case POST_FAMILY:
	case POST_PERSON:
	case POST_SPOUSE:
	case POST_CHILD:
		return state;
	case INVALID_FAMILY:
	case INVALID_LOAD_FAMILY:
	case INVALID_PERSON:
	case INVALID_SPOUSE:
	case INVALID_CHILD:
		console.log('invalid! stacktrace:' + action.error.stack);
		return state;
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