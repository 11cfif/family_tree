// import Person from '../objects/Person'
import {
	CREATE_FAMILY_INFO_MODAL, CREATE_FAMILY_HEAD_MODAL,
	CREATE_NODE_MODAL, CREATE_EDIT_PERSON_MODAL,
	CLOSE_MODAL, NULL_MODAL
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
				title: 'Глава семьи',
				familyInfo: action.familyInfo,
				person: null
			}}
		);
	case CREATE_NODE_MODAL:
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				node: action.node
			}}
		);
	case CREATE_EDIT_PERSON_MODAL:
		console.log('reducer modal state=' + JSON.stringify(state, null ,2));
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				title: 'Редактирование',
				familyInfo: null,
				person: action.person
			}}
		);
	case CLOSE_MODAL:
		return initState;
	default:
		return state;
	}
};

export default updateModal;
