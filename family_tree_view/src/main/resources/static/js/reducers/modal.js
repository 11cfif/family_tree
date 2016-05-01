import {
	CREATE_FAMILY_MODAL, CREATE_PERSON_MODAL, CLOSE_FAMILY_MODAL, CLOSE_PERSON_MODAL
} from '../constants/Modal'

const updateModal = (state = null, action) => {
	console.log('updateModel = ' + JSON.stringify(state));
	console.log('updateModel = ' + JSON.stringify(action));
	switch (action.type) {
	case CREATE_FAMILY_MODAL:

		console.log('updateModel = 1' );
		var o = Object.assign({}, state, {modal: action.modal});
		console.log('updateModel = ' + JSON.stringify(action.modal));
		return action.modal
	case CLOSE_FAMILY_MODAL:
		return null;
	case CREATE_PERSON_MODAL:
	case CLOSE_PERSON_MODAL:
	default:
		return state;
	}
};

export default updateModal;
