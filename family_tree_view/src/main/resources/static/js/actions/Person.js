import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON, PERSON_URL_PATH,
	POST_SPOUSE, RESPONSE_SPOUSE, INVALID_SPOUSE
} from '../constants/Person'

import {
	FAMILY_URL_PATH
} from '../constants/Family'

import {
	URL
} from '../constants/App'

let personRequest = {
	method: 'put',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body:''
};

let spouseRequest = {
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
		personRequest.body = JSON.stringify(person);
		return fetch(URL + PERSON_URL_PATH + person.id, personRequest)
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
		spouseRequest.body = JSON.stringify({
			descendantId,
			description:'',
			startDate:'',
			finishDate:'',
			spouse
		});
		return fetch(URL + FAMILY_URL_PATH + familyId + '/spouse/', spouseRequest)
			.then(response => response.json())
			.then(json => dispatch(receiveSpouse(json)))
			.catch(error => dispatch(invalidateSpouse(error)))
	}
}

