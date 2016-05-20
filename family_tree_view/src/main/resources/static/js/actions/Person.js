import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON, PERSON_URL_PATH,
	POST_SPOUSE, RESPONSE_SPOUSE, INVALID_SPOUSE,
	POST_DELETE_SPOUSE, RESPONSE_DELETE_SPOUSE, INVALID_DELETE_SPOUSE,
	POST_CHILD, RESPONSE_CHILD, INVALID_CHILD,
	POST_DELETE_CHILD, RESPONSE_DELETE_CHILD, INVALID_DELETE_CHILD,
	 SELECT_SPOUSE, CHANGE_SPOUSE
} from '../constants/Person'

import {
	FAMILY_URL_PATH
} from '../constants/Family'

import {
	URL, createRequest
} from '../constants/App'

//----------------------------- updatePerson -----------------------------

function postPerson(person) {
	return {
		type: POST_PERSON,
		person
	}
}

export function invalidatePerson(error) {
	return {
		type: INVALID_PERSON,
		error
	}
}

function receivePerson(json) {
	return {
		type: RESPONSE_PERSON,
		person: json
	}
}

export function fetchUpdatePerson(person) {
	return dispatch => {
		dispatch(postPerson(person));
		return fetch(URL + PERSON_URL_PATH + person.id, createRequest('put', JSON.stringify(person)))
			.then(response => response.json())
			.then(json => dispatch(receivePerson(person, json)))
			.catch(error => dispatch(invalidatePerson(error)))
	}
}

//----------------------------- addSpouse -----------------------------

function postSpouse(spouse) {
	return {
		type: POST_SPOUSE,
		spouse
	}
}

export function invalidateSpouse(error) {
	return {
		type: INVALID_SPOUSE,
		error
	}
}

function receiveSpouse(json) {
	return {
		type: RESPONSE_SPOUSE,
		spouse: json
	}
}

export function fetchSpouse(familyId, descendantId, spouse) {
	return dispatch => {
		dispatch(postSpouse(spouse));
		const body = JSON.stringify({
			descendantId,
			description:'',
			startDate:'',
			finishDate:'',
			spouse
		});
		return fetch(URL + FAMILY_URL_PATH + familyId + '/spouse/', createRequest('post', body))
			.then(response => response.json())
			.then(json => dispatch(receiveSpouse(json)))
			.catch(error => dispatch(invalidateSpouse(error)))
	}
}

//----------------------------- deleteSpouse -----------------------------

function postDeleteSpouse(familyId, spouseId) {
	return {
		type: POST_DELETE_SPOUSE,
		familyId,
		spouseId
	}
}

export function invalidateDeleteSpouse(error) {
	return {
		type: INVALID_DELETE_SPOUSE,
		error
	}
}

function receiveDeleteSpouse() {
	return {
		type: RESPONSE_DELETE_SPOUSE
	}
}

export function deleteFetchSpouse(familyId, spouseId) {
	return dispatch => {
		dispatch(postDeleteSpouse(familyId, spouseId));
		return fetch(URL + FAMILY_URL_PATH + familyId + '/spouse/', createRequest('delete', JSON.stringify({spouseId: spouseId})))
			.then(response => response.json())
			.then(json => dispatch(receiveDeleteSpouse(json)))
			.catch(error => dispatch(invalidateDeleteSpouse(error)))
	}
}

//----------------------------- addChild -----------------------------

function postChild(child) {
	return {
		type: POST_CHILD,
		child
	}
}

export function invalidateChild(error) {
	return {
		type: INVALID_CHILD,
		error
	}
}

function receiveChild(json) {
	return {
		type: RESPONSE_CHILD,
		child: json
	}
}

export function fetchChild(familyId, descendantId, spouseId, child) {
	return dispatch => {
		dispatch(postChild(child));
		const body = JSON.stringify({
			descendantId,
			spouseId,
			description:'',
			child
		});
		return fetch(URL + FAMILY_URL_PATH + familyId + '/child/', createRequest('post', body))
			.then(response => response.json())
			.then(json => dispatch(receiveChild(json)))
			.catch(error => dispatch(invalidateChild(error)))
	}
}

//----------------------------- deleteChild -----------------------------

function postDeleteChild(familyId, childId) {
	return {
		type: POST_DELETE_CHILD,
		familyId,
		childId
	}
}

export function invalidateDeleteChild(error) {
	return {
		type: INVALID_DELETE_CHILD,
		error
	}
}

function receiveDeleteChild() {
	return {
		type: RESPONSE_DELETE_CHILD
	}
}

export function deleteFetchChild(familyId, childId) {
	return dispatch => {
		dispatch(postDeleteChild(familyId, childId));

		return fetch(URL + FAMILY_URL_PATH + familyId + '/child/', createRequest('delete', JSON.stringify({childId: childId})))
			.then(response => response.json())
			.then(json => dispatch(receiveDeleteChild(json)))
			.catch(error => dispatch(invalidateDeleteChild(error)))
	}
}


//----------------------------- other -----------------------------

export function selectSpouse(selectedId) {
	return {
		type: SELECT_SPOUSE,
		selectedId
	}
}

export function changeSpouse(spouseId) {
	return {
		type: CHANGE_SPOUSE,
		spouseId
	}
}


