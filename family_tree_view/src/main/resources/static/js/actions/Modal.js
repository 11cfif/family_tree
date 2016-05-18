import {
	CREATE_FAMILY_INFO_MODAL,
	CREATE_NODE_MODAL, CLOSE_MODAL, NODE_MODAL, PERSON_MODAL,
	CREATE_EDIT_PERSON_MODAL, CREATE_SPOUSE_MODAL, CREATE_CHILD_MODAL, 
	CREATE_FAMILY_HEAD_MODAL, FAMILY_INFO_MODAL
} from '../constants/Modal'

export function createFamilyModal() {
	return {
		type: CREATE_FAMILY_INFO_MODAL,
		modalType: FAMILY_INFO_MODAL
	}
}

export function createNodeModal(node) {
	return {
		type: CREATE_NODE_MODAL,
		modalType: NODE_MODAL,
		node
	}
}

export function createFamilyHeadModal(familyInfo) {
	return {
		type: CREATE_FAMILY_HEAD_MODAL,
		modalType: PERSON_MODAL,
		familyInfo
	}
}

export function createEditPersonModal(person) {
	return {
		type: CREATE_EDIT_PERSON_MODAL,
		modalType: PERSON_MODAL,
		person
	}
}

export function createSpouseModal(descendant) {
	return {
		type: CREATE_SPOUSE_MODAL,
		modalType: PERSON_MODAL,
		descendant
	}
}

export function createChildModal(node) {
	return {
		type: CREATE_CHILD_MODAL,
		modalType: PERSON_MODAL,
		node
	}
}


export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}


