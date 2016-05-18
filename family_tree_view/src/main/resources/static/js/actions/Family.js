import {createNode} from '../objects/Node'
import {createFamilyInfo} from '../objects/FamilyInfo'

import {
	POST_FAMILY, RESPONSE_FAMILY, INVALID_FAMILY
} from '../constants/Family'
import {
	URL
} from '../constants/App'

const FAMILY_URL = 'family/';

let familyRequest = {
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body:''
};

function postFamily(familyInfo, head) {
	return {
		type: POST_FAMILY,
		familyInfo,
		head
	}
}

export function invalidateFamily(error) {
	return {
		type: INVALID_FAMILY,
		familyInfo: error
	}
}

function receiveFamily(json) {
	return {
		type: RESPONSE_FAMILY,
		familyInfo: createFamilyInfo(json.familyInfo),
		nodes: [createNode(json.nodes[0])],
		edges: []
	}
}

export function fetchFamily(familyInfo, head) {
	return dispatch => {
		const id = -1;
		dispatch(postFamily(id, familyInfo, head));
		familyRequest.body = JSON.stringify(Object.assign({}, familyInfo, {head: head}));
		return fetch(URL + FAMILY_URL, familyRequest)
			.then(response => response.json())
			.then(json => dispatch(receiveFamily(json)))
			.catch(error => dispatch(invalidateFamily(error)))
	}
}

