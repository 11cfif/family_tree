package ru.cfif.cs.familytree.model;

import java.time.LocalDate;

public class Person {

	private final long id;
	private final long familyId;
	private final String name;
	private final String surname;
	private final LocalDate birthday;
	private final LocalDate deathday;

	public Person(long id, long familyId, String name, String surname, LocalDate birthday, LocalDate deathday) {
		this.id = id;
		this.familyId = familyId;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
	}

	public Person(long id, Person person) {
		this.id = id;
		this.familyId = person.getFamilyId();
		this.name = person.getName();
		this.surname = person.getSurname();
		this.birthday = person.getBirthday();
		this.deathday = person.getDeathday();
	}

	public long getFamilyId() {
		return familyId;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public LocalDate getDeathday() {
		return deathday;
	}
}
