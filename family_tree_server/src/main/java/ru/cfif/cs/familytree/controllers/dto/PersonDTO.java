package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.Person;

public class PersonDTO {

	private final long id;
	private final String name;
	private final String surname;
	private final String birthday;


	@JsonCreator
	public PersonDTO(@JsonProperty("id") long id, @JsonProperty("name") String name, @JsonProperty("surname") String surname,  @JsonProperty("birthday") String birthday) {
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.id = id;
	}

	public PersonDTO(Person person) {
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
}
