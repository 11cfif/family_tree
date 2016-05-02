// import {
// 	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
// } from '../constants/Adding'
import {
	CREATE_FAMILY, CREATE_PERSON, CREATE_PERSON_MODAL, CLOSE_PERSON_MODAL
} from '../constants/Modal'

let initialState = {
	isCreated: false,
	familyName: '',
	description: '',
	persons: [],
	isFetching: false,
	modalIsOpen: false
};

const person = (state = [], action) => {
	switch (action.type) {
	case CREATE_PERSON:
		return [... state, action.person];
	default:
		return state;
	}
};

const family = (state = initialState, action) => {
	console.log('family = ' + JSON.stringify(state));
	console.log('family = ' + JSON.stringify(action));
	switch(action.type) {
	case CREATE_PERSON_MODAL:
		return  Object.assign({}, state, {
			modalIsOpen: true
		});
	case CLOSE_PERSON_MODAL:
		return  Object.assign({}, state, {
			modalIsOpen: false
		});
	case CREATE_FAMILY:
		return Object.assign({}, state, {
			isCreated: true,
			familyName: action.familyName,
			description: action.description
		});
	case CREATE_PERSON:
		return Object.assign({}, state, {
			persons: person(state.person, action)
		});
	default:
		return state;
	}
};

export default family;
