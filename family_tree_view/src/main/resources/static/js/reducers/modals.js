import {
	CREATE_FAMILY_INFO_MODAL, CREATE_FAMILY_HEAD_MODAL,
	CREATE_NODE_MODAL, CREATE_EDIT_PERSON_MODAL, CREATE_SPOUSE_MODAL, CREATE_CHILD_MODAL, CREATE_SELECT_SPOUSE_MODAL,
	CLOSE_MODAL, NULL_MODAL
} from '../constants/Modal'

import {
	SPOUSE, CHILD, HEAD, SELECT_SPOUSE, CHANGE_SPOUSE
} from '../constants/Person'

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
				relationType: HEAD,
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
	case CREATE_SPOUSE_MODAL:
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				relationType: SPOUSE,
				title: 'Добавьте супруга для ' + action.descendant.getFullName(),
				familyInfo: null,
				person: action.descendant
			}}
		);
	case CREATE_CHILD_MODAL:
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				relationType: CHILD,
				title: 'Добавьте рёбнка для пары ' + action.node.getSpousesFullName(),
				familyInfo: null,
				node: action.node
			}}
		);
	case CREATE_SELECT_SPOUSE_MODAL:
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				spouses: action.node.spouses,
				selectedId: action.node.spouseId,
				descendant: action.node.descendant
			}}
		);
	case SELECT_SPOUSE:
		return Object.assign({},
			state,
			{modalData:  Object.assign({},
				state.modalData,
				{selectedId: action.selectedId}
			)}
		);
	case CREATE_EDIT_PERSON_MODAL:
		return Object.assign({},
			state,
			{modalType: action.modalType},
			{modalData: {
				relationType: null,
				title: 'Редактирование',
				familyInfo: null,
				person: action.person
			}}
		);
	case CHANGE_SPOUSE:
	case CLOSE_MODAL:
		return initState;
	default:
		return state;
	}
};


export default updateModal;
