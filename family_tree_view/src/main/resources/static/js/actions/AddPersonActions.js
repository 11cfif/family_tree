import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
} from '../constants/Adding'
import {
	URL
} from '../constants/App'

const PERSON_URL = 'person/';

let personRequest = {
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
	console.log('error' + error);
	return {
		type: INVALID_PERSON,
		person: error
	}
}

function receivePerson(json) {
	console.log('receive = ' + JSON.stringify(json));
	return {
		type: RESPONSE_PERSON,
		person: json
	}
}

export function fetchPerson(person) {
	return dispatch => {
		dispatch(postPerson(person));
		personRequest.body = JSON.stringify(person);
		return fetch(URL + PERSON_URL, personRequest)
			.then(response => response.json())
			.then(json => dispatch(receivePerson(person, json)))
			.catch(error => dispatch(invalidatePerson(error)))
	}
}

