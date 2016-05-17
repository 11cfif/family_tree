import {
	CREATE_FAMILY_INFO_MODAL, CLOSE_FAMILY_MODAL
} from '../constants/Modal'

const updateModal = (state = false, action) => {
	switch (action.type) {
	case CREATE_FAMILY_INFO_MODAL:
		return true;
	case CLOSE_FAMILY_MODAL:
		return false;
	default:
		return state;
	}
};

export default updateModal;
