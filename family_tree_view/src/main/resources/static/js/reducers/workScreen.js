import {
	SET_FAMILY_LIST_SCREEN, SET_FAMILY_SCREEN,
	FAMILY_LIST_SCREEN_TYPE, FAMILY_SCREEN_TYPE
} from '../constants/Screen'

import {
	RESPONSE_LOAD_FAMILY
} from '../constants/Family'

const screenType = (state = FAMILY_SCREEN_TYPE, action) => {
	switch (action.type) {
	case RESPONSE_LOAD_FAMILY:
	case SET_FAMILY_SCREEN:
		return FAMILY_SCREEN_TYPE;
	case SET_FAMILY_LIST_SCREEN:
		return FAMILY_LIST_SCREEN_TYPE;
	default:
		return state;
	}
};


export default screenType;
