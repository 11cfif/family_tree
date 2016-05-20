import {
	CREATE_FAMILY_INFO_MODAL
} from '../constants/Modal'

import {
	RESPONSE_DELETE_FAMILY, INVALID_DELETE_FAMILY,
	POST_UPDATE_FAMILY, RESPONSE_UPDATE_FAMILY, INVALID_UPDATE_FAMILY
} from '../constants/Family'

import {
	RESPONSE_FAMILIES, INVALID_FAMILIES
} from '../constants/Family'

const family = (state, action) => {
	switch (action.type) {
	case RESPONSE_UPDATE_FAMILY:
		if (state.id != action.familyInfo.id)
			return state;
		return action.familyInfo;
	default:
		return state;
	}
};

const familyList = (state = [], action) => {
	switch (action.type) {
	case RESPONSE_UPDATE_FAMILY:
		return state.map(fam => family(fam, action));
	case RESPONSE_FAMILIES:
		return action.families;
	case RESPONSE_DELETE_FAMILY:
		return state.filter(fam => fam.id != action.familyId);
	case INVALID_UPDATE_FAMILY:
	case INVALID_DELETE_FAMILY:
	case INVALID_FAMILIES:
		console.log('invalid! stacktrace:' + action.error.stack);
		return state;
	case POST_UPDATE_FAMILY:
	case CREATE_FAMILY_INFO_MODAL:
	default:
		return state;
	}
};


export default familyList;
