import {
	CREATE_FAMILY_MODAL, CREATE_PERSON_MODAL, CLOSE_FAMILY_MODAL, CLOSE_PERSON_MODAL, CREATE_FAMILY, CREATE_PERSON
} from '../constants/Modal'

export function createFamilyModal() {
	return {
		type: CREATE_FAMILY_MODAL
	}
}

export function createPersonModal() {
	return {
		type: CREATE_PERSON_MODAL
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
	return {
		type: CREATE_FAMILY,
		familyName,
		description
	}
}

let idCount = 0;
export function createPerson(name, surname, birthday, deathday) {
	return {
		type: CREATE_PERSON,
		person: {
			id: ++idCount,
			name,
			surname,
			birthday,
			deathday
		}
	}
}


