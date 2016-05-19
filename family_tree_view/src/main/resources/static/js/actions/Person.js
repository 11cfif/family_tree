import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON, PERSON_URL_PATH,
	POST_SPOUSE, RESPONSE_SPOUSE, INVALID_SPOUSE,
	POST_CHILD, RESPONSE_CHILD, INVALID_CHILD,
	 SELECT_SPOUSE, CHANGE_SPOUSE
} from '../constants/Person'

import {
	FAMILY_URL_PATH
} from '../constants/Family'

import {
	URL
} from '../constants/App'

let editPersonRequest = {
	method: 'put',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body:''
};

let newPersonRequest = {
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body:''
};

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
		editPersonRequest.body = JSON.stringify(person);
		return fetch(URL + PERSON_URL_PATH + person.id, editPersonRequest)
			.then(response => response.json())
			.then(json => dispatch(receivePerson(person, json)))
			.catch(error => dispatch(invalidatePerson(error)))
	}
}

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
		newPersonRequest.body = JSON.stringify({
			descendantId,
			description:'',
			startDate:'',
			finishDate:'',
			spouse
		});
		return fetch(URL + FAMILY_URL_PATH + familyId + '/spouse/', newPersonRequest)
			.then(response => response.json())
			.then(json => dispatch(receiveSpouse(json)))
			.catch(error => dispatch(invalidateSpouse(error)))
	}
}

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
		newPersonRequest.body = JSON.stringify({
			descendantId,
			spouseId,
			description:'',
			child
		});
		return fetch(URL + FAMILY_URL_PATH + familyId + '/child/', newPersonRequest)
			.then(response => response.json())
			.then(json => dispatch(receiveChild(json)))
			.catch(error => dispatch(invalidateChild(error)))
	}
}

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


