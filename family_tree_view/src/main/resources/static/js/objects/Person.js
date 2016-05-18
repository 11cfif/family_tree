const FAKE_ID = -1;

class Person {
	constructor(name, surname, birthday, deathday, id) {
		// console.log('PERSON CONSTRUCTOR ?? = ' + (id ? 'YES' : 'NO'));
		this.id = id ? id : FAKE_ID;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
	}
}

export default Person;

export function createPerson(person) {
	return new Person(person.name, person.surname, person.birthday, person.deathday, person.id);
}