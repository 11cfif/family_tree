import {
	ADD_PERSON
} from '../constants/Adding'

export const addPerson = (person) => {
	console.log('AddPersonActions' + JSON.stringify(person));
	return {
		type: ADD_PERSON,
		person: person
	}
}
