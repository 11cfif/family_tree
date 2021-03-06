import {clonePerson} from './Person'

const FAKE_ID = -1;

class FamilyInfo {
	constructor(name, description, head, id) {
		this.id = id ? id : FAKE_ID;
		this.name = name;
		this.description = description;
		this.head = head;
	}
}

export default FamilyInfo

export function cloneFamilyInfo(info) {
	return new FamilyInfo(info.name, info.description, clonePerson(info.head), info.id);
}

export function createFamilyInfo(info, person) {
	return new FamilyInfo(info.name, info.description, person ? person : clonePerson(info.head), info.id);
}