import {
	ADD_PERSON
} from '../constants/Adding'

const addPerson = (state = [], action) => {
	switch (action.type) {
	case ADD_PERSON:
		let o = [...state, action.person]
		return o
	default:
		return state;
	}
}

export default addPerson;
