package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.Person;

public class PersonDTO {

	private final long id;
	private final String name;
	private final String surname;

	@JsonCreator
	public PersonDTO(@JsonProperty("name") String name, @JsonProperty("surname") String surname, @JsonProperty("id") long id) {
		this.name = name;
		this.surname = surname;
		this.id = id;
	}

	public PersonDTO(Person person) {
		this.name = person.getName();
		this.surname = person.getSurname();
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
}
