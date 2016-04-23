import {
	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
} from '../constants/Adding'

let initialState = {
	persons: [],
	isFetching: false
};

const addPerson = (state = initialState, action) => {
	console.log('reducer = ' + JSON.stringify(state));
	switch (action.type) {
	case POST_PERSON:
		return Object.assign({}, state, {isFetching: true});
	case RESPONSE_PERSON:
		return Object.assign({}, state, {persons: [...state.persons, action.person]})
	case INVALID_PERSON:

	default:
		return state;
	}
};

export default addPerson;
