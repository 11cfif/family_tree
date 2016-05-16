import {createPerson} from './Person'

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

export function createFamilyInfo(info) {
	console.log('create FamilyInfo ' + JSON.stringify(info, null, 2));

	return new FamilyInfo(info.name, info.description, createPerson(info.head), info.id);
}