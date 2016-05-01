// import {
// 	POST_PERSON, RESPONSE_PERSON, INVALID_PERSON
// } from '../constants/Adding'
import {
	CREATE_FAMILY, CREATE_PERSON
} from '../constants/Modal'

let initialState = {
	isEmpty: true,
	familyName: '',
	description: '',
	persons: [],
	isFetching: false
};

const family = (state = initialState, action) => {
	console.log('family = ' + JSON.stringify(state));
	console.log('family = ' + JSON.stringify(action));
	switch(action.type) {
	case CREATE_FAMILY:
		return Object.assign({}, state, {
			isEmpty: false,
			familyName: action.familyName,
			description: action.description
		});
	case CREATE_PERSON:
	default:
		return state;
	}
};

// const addPerson = (state = initialState, action) => {
// 	console.log('reducer = ' + JSON.stringify(state));
// 	switch (action.type) {
// 	case POST_PERSON:
// 		return Object.assign({}, state, {isFetching: true});
// 	case RESPONSE_PERSON:
// 		return Object.assign({}, state, {persons: [...state.persons, action.person]})
// 	case INVALID_PERSON:
// 	default:
// 		return state;
// 	}
// };

export default family;
