import Person from '../objects/Person'
import {
	CREATE_FAMILY_INFO_MODAL, CREATE_FAMILY_HEAD_MODAL, CLOSE_MODAL, NULL_MODAL
} from '../constants/Modal'

const initState = {
	modalData: {},
	modalType: NULL_MODAL
};

const updateModal = (state = initState, action) => {
	switch (action.type) {
	case CREATE_FAMILY_INFO_MODAL:
		return Object.assign({}, state, {modalType: action.modalType}, {modalData: {}});
	case CREATE_FAMILY_HEAD_MODAL:
		return Object.assign({}, 
			state, 
			{modalType: action.modalType}, 
			{modalData: {
				familyInfo: action.familyInfo,
				person: new Person('','','','')
			}}
		)
	case CLOSE_MODAL:
		return initState;
	default:
		return state;
	}
};

export default updateModal;
