var count = -1;

class Person {
	constructor(name, surname, birthday, deathday) {
		this.id = ++count;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
	}
}

export default Person