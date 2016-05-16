import {
	CREATE_FAMILY_MODAL, CREATE_PERSON_CREATOR_MODAL, CREATE_PERSON_SELECTOR_MODAL, 
	CLOSE_FAMILY_MODAL, CLOSE_PERSON_MODAL, 
	CREATE_FAMILY, CREATE_PERSON, SELECT_PERSON
} from '../constants/Modal'

export function createFamilyModal() {
	return {
		type: CREATE_FAMILY_MODAL
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

export function createFamily(familyInfo) {
	return {
		type: CREATE_FAMILY,
		familyInfo
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


