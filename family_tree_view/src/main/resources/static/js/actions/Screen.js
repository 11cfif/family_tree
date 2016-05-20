import {
	SET_FAMILY_LIST_SCREEN, SET_FAMILY_SCREEN
} from '../constants/Screen'

export function setFamilyScreen() {
	return {
		type: SET_FAMILY_SCREEN
	}
}

export function setFamilyListScreen() {
	return {
		type: SET_FAMILY_LIST_SCREEN
	}
}