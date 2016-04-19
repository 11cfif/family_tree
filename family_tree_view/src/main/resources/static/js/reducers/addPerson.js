import {
	ADD_PERSON
} from '../constants/Adding'

let initialState = {
	familyName:'Tes',
	persons:[]
}

const adding = (state = initialState, action) => {
	console.log('reducers adding:' + JSON.stringify(action))
	console.log('reducers adding:' + JSON.stringify(state))
	switch (action.type) {
	case ADD_PERSON:
		console.log('===== ' + JSON.stringify(initialState) + ' =====')
		let o = Object.assign({}, state, {
			persons: [...state, action.person]
		})
		console.log('===== ' + JSON.stringify(o) + ' =====')
		return o
	default:
		return state;
	}
}

export default adding;
