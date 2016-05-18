import {
	CREATE_PERSON, SELECT_PERSON, CREATE_NODE_MODAL
} from '../constants/Modal'

import {
	POST_FAMILY, RESPONSE_FAMILY, INVALID_FAMILY
} from '../constants/Family'

import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON, POST_SPOUSE, RESPONSE_SPOUSE, INVALID_SPOUSE
} from '../constants/Person'

import {createFamilyInfo} from '../objects/FamilyInfo'
import {createNode, addSpouse} from '../objects/Node'

let initialTree = {
	activeNodeId: -1,
 	nodes: null,
	edges: null
};
let initialState = {
	isCreated: false,
	familyInfo: null,
	tree: initialTree
};

const node = (state, action, activeNode) => {
	switch (action.type) {
	case RESPONSE_PERSON:
		if (activeNode != state.id)
			return state;
		return createNode(state, action.person);
	case RESPONSE_SPOUSE:
		if (activeNode != state.id)
			return state;
		return addSpouse(state, action.spouse)
	}
};

const treeF = (state, action) => {
	switch (action.type) {
	case CREATE_NODE_MODAL:
		return Object.assign({}, state, {
			activeNodeId: action.node.id
		});
	case RESPONSE_FAMILY:
		return Object.assign({}, state, {
			nodes: action.nodes
		});
	case RESPONSE_PERSON:
		return Object.assign({}, state, {
			nodes: state.nodes.map(n => node(n, action, state.activeNodeId))
		});
	case RESPONSE_SPOUSE:
		return Object.assign({}, state, {
			nodes: state.nodes.map(n => node(n, action, state.activeNodeId))
		});
	default:
		return state;
	}
};

const family = (state = initialState, action) => {
	let tree = state.tree;
	switch (action.type) {
	case CREATE_NODE_MODAL:
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case RESPONSE_FAMILY:
		console.log('reducer family action = ' + JSON.stringify(action, null, 2));
		return Object.assign({}, state, {
			isCreated: true,
			familyInfo: action.familyInfo,
			tree: treeF(tree, action)
		});
	case RESPONSE_PERSON:
		console.log('reducer person action = ' + JSON.stringify(action, null, 2));
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
		console.log('reducer spouse action = ' + JSON.stringify(action, null, 2));
		return Object.assign({}, state, {
			tree: treeF(tree, action)
		});
	case POST_FAMILY:
	case INVALID_FAMILY:
	case POST_PERSON:
	case INVALID_PERSON:
	case POST_SPOUSE:
	case INVALID_SPOUSE:
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