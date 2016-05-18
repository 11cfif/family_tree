import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
} from '../constants/Person'
import {
	URL
} from '../constants/App'

const PERSON_URL = 'person/';

let personRequest = {
	method: 'put',
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
		person: error
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
		return fetch(URL + PERSON_URL + person.id, personRequest)
			.then(response => response.json())
			.then(json => dispatch(receivePerson(person, json)))
			.catch(error => dispatch(invalidatePerson(error)))
	}
}

