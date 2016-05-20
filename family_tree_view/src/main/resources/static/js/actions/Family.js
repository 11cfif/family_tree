import {createNode} from '../objects/Node'
import {cloneEdge} from '../objects/Edge'
import {cloneFamilyInfo} from '../objects/FamilyInfo'

import {
	POST_FAMILY, RESPONSE_FAMILY, INVALID_FAMILY,
	POST_LOAD_FAMILY, RESPONSE_LOAD_FAMILY, INVALID_LOAD_FAMILY,
	POST_UPDATE_FAMILY, RESPONSE_UPDATE_FAMILY, INVALID_UPDATE_FAMILY,
	POST_DELETE_FAMILY, RESPONSE_DELETE_FAMILY, INVALID_DELETE_FAMILY,
	LOADING_FAMILIES, RESPONSE_FAMILIES, INVALID_FAMILIES,
	FAMILY_URL_PATH
} from '../constants/Family'
import {
	createRequest, URL
} from '../constants/App'

//----------------------------- createFamily -----------------------------

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
		familyInfo: cloneFamilyInfo(json.familyInfo),
		nodes: [createNode(json.nodes[0])],
		edges: []
	}
}

export function fetchFamily(familyInfo, head) {
	return dispatch => {
		const id = -1;
		dispatch(postFamily(id, familyInfo, head));
		return fetch(URL + FAMILY_URL_PATH, createRequest('post', JSON.stringify(Object.assign({}, familyInfo, {head: head}))))
			.then(response => response.json())
			.then(json => dispatch(receiveFamily(json)))
			.catch(error => dispatch(invalidateFamily(error)))
	}
}

//----------------------------- loadFamily -----------------------------

function postLoadFamily(familyId) {
	return {
		type: POST_LOAD_FAMILY,
		familyId
	}
}

export function invalidateLoadFamily(error) {
	return {
		type: INVALID_LOAD_FAMILY,
		error
	}
}

function receiveLoadFamily(json) {
	console.log('load = ' + JSON.stringify(json, null, 2));
	return {
		type: RESPONSE_LOAD_FAMILY,
		familyInfo: cloneFamilyInfo(json.familyInfo),
		nodes: json.nodes.map(node => createNode(node)),
		edges: json.edges.map(edge => cloneEdge(edge))
	}
}

export function loadFetchFamily(familyId) {
	return dispatch => {
		dispatch(postLoadFamily(familyId));
		return fetch(URL + FAMILY_URL_PATH + familyId, createRequest('get'))
			.then(response => response.json())
			.then(json => dispatch(receiveLoadFamily(json)))
			.catch(error => dispatch(invalidateLoadFamily(error)))
	}
}
//----------------------------- updateFamily -----------------------------

function postUpdateFamily(familyInfo) {
	return {
		type: POST_UPDATE_FAMILY,
		familyInfo
	}
}

export function invalidateUpdateFamily(error) {
	return {
		type: INVALID_UPDATE_FAMILY,
		familyInfo: error
	}
}

function receiveUpdateFamily(json) {
	return {
		type: RESPONSE_UPDATE_FAMILY,
		familyInfo: cloneFamilyInfo(json)
	}
}

export function updateFetchFamily(familyInfo) {
	return dispatch => {
		dispatch(postUpdateFamily(familyInfo));
		const body = JSON.stringify(familyInfo);
		return fetch(URL + FAMILY_URL_PATH + familyInfo.id, createRequest('put', body))
			.then(response => response.json())
			.then(json => dispatch(receiveUpdateFamily(json)))
			.catch(error => dispatch(invalidateUpdateFamily(error)));
	}
}

//----------------------------- deleteFamily -----------------------------

function postDeleteFamily(familyId) {
	return {
		type: POST_DELETE_FAMILY,
		familyId
	}
}

export function invalidateDeleteFamily(error) {
	return {
		type: INVALID_DELETE_FAMILY,
		familyInfo: error
	}
}

function receiveDeleteFamily(json) {
	return {
		type: RESPONSE_DELETE_FAMILY,
		familyId: json
	}
}

export function deleteFetchFamily(familyId) {
	return dispatch => {
		dispatch(postDeleteFamily(familyId));
		return fetch(URL + FAMILY_URL_PATH + familyId, createRequest('delete'))
			.then(response => response.json())
			.then((json) => dispatch(receiveDeleteFamily(json)))
			.catch(error => dispatch(invalidateDeleteFamily(error)));
	}
}
//----------------------------- loadFamilies -----------------------------

function postFamilies() {
	return {
		type: LOADING_FAMILIES
	}
}

export function invalidateFamilies(error) {
	return {
		type: INVALID_FAMILIES,
		families: error
	}
}

function receiveFamilies(json) {
	return {
		type: RESPONSE_FAMILIES,
		families: json.map(info => cloneFamilyInfo(info))
	}
}

export function fetchLoadFamilies() {
	return dispatch => {
		dispatch(postFamilies());
		return fetch(URL + FAMILY_URL_PATH, createRequest('get'))
			.then(response => response.json())
			.then(json => dispatch(receiveFamilies(json)))
			.catch(error => dispatch(invalidateFamilies(error)))
	}
}

