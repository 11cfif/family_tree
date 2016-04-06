package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class PersonDTO {

	private final String name;
	private final String surname;

	@JsonCreator
	public PersonDTO(@JsonProperty("name") String name,@JsonProperty("surname") String surname) {
		this.name = name;
		this.surname = surname;
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
