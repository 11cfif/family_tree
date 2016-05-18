const FAKE_ID = -1;

class Person {
	constructor(name, surname, birthday, deathday, id) {
		this.id = id ? id : FAKE_ID;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
	}
	
	getFullName() {
		return this.name + ' ' + this.surname;
	}
}

export default Person;

export function createPerson(person) {
	var newPerson = new Person(person.name, person.surname, person.birthday, person.deathday, person.id);
	return newPerson;
}