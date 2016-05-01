import {
	CREATE_FAMILY_MODAL, CREATE_PERSON_MODAL, CLOSE_FAMILY_MODAL, CLOSE_PERSON_MODAL, CREATE_FAMILY, CREATE_PERSON
} from '../constants/Modal'

export function createFamilyModal(modal) {
	return {
		type: CREATE_FAMILY_MODAL,
		modal
	}
}

export function createPersonModal(modal) {
	return {
		type: CREATE_PERSON_MODAL,
		modal
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

export function createFamily(familyName, description) {
	console.log('!!!!!!!!!!! ' + familyName + ' ' + description)
	return {
		type: CREATE_FAMILY,
		familyName,
		description
	}
}

export function closePersonModal() {
	return {
		type: CREATE_PERSON
	}
}


