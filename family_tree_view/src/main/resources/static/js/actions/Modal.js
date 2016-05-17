import {
	CREATE_FAMILY_INFO_MODAL, CREATE_PERSON_CREATOR_MODAL, CREATE_PERSON_SELECTOR_MODAL, 
	CLOSE_FAMILY_MODAL, CLOSE_PERSON_MODAL, CLOSE_MODAL, PERSON_MODAL,
	CREATE_FAMILY_HEAD_MODAL, CREATE_PERSON, SELECT_PERSON, FAMILY_INFO_MODAL
} from '../constants/Modal'

export function createFamilyModal() {
	return {
		type: CREATE_FAMILY_INFO_MODAL,
		modalType: FAMILY_INFO_MODAL
	}
}

export function createPersonCreatorModal() {
	return {
		type: CREATE_PERSON_CREATOR_MODAL
	}
}

export function createPersonSelectorModal(nodeId) {
	
	return {
		type: CREATE_PERSON_SELECTOR_MODAL,
		nodeId
	}
}

export function closeFamilyModal() {
	return {
		type: CLOSE_FAMILY_MODAL
	}
}

export function closePersonModal() {
	return {
		type: CLOSE_PERSON_MODAL
	}
}

export function createFamilyHeadModal(familyInfo) {
	return {
		type: CREATE_FAMILY_HEAD_MODAL,
		modalType: PERSON_MODAL,
		familyInfo
	}
}



export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}

export function createPerson(person, relationType, description) {
	return {
		type: CREATE_PERSON,
		person: person,
		relationType,
		description
	}
}

export function selectPerson(id) {
	return {
		type: SELECT_PERSON,
		id
	}
}


