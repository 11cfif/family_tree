package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.Person;

public class PersonDTO {

	private final long id;
	private final String name;
	private final String surname;
	private final String birthday;
	private final String deathday;

	@JsonCreator
	public PersonDTO(
		@JsonProperty("id") long id,
		@JsonProperty("name") String name,
		@JsonProperty("surname") String surname,
		@JsonProperty("birthday") String birthday,
		@JsonProperty("deathday") String deathday)
	{
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.id = id;
		this.deathday = deathday;
	}

	public PersonDTO(Person person) {
		this.deathday = person.getDeathday();
		this.name = person.getName();
		this.surname = person.getSurname();
		this.birthday = person.getBirthday();
		this.id = person.getId();
	}

	@JsonGetter
	public long getId() {
		return id;
	}

	@JsonGetter
	public String getName() {
		return name;
	}

	@JsonGetter
	public String getSurname() {
		return surname;
	}

	@JsonGetter
	public String getBirthday() {
		return birthday;
	}

	@JsonGetter
	public String getDeathday() {
		return deathday;
	}

	public Person createPerson(long familyId) {
		return new Person(id, familyId, name, surname, birthday, deathday);
	}

	@Override
	public String toString() {
		return "PersonDTO{" +
			"id=" + id +
			", name='" + name + '\'' +
			", surname='" + surname + '\'' +
			", birthday='" + birthday + '\'' +
			", deathday='" + deathday + '\'' +
			'}';
	}
}
