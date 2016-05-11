package ru.cfif.cs.familytree.model;


import java.util.concurrent.atomic.AtomicLong;

public class Person {

	private static final AtomicLong counter = new AtomicLong();

	private final long id;
	private final String name;
	private final String surname;
	private final String birthday;
	private final String deathday;

	public Person(String name, String surname, String birthday, String deathday) {
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
		this.id = counter.getAndIncrement();
	}

	public Person(long id, String name, String surname, String birthday, String deathday) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.deathday = deathday;
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

	public String getBirthday() {
		return birthday;
	}

	public String getDeathday() {
		return deathday;
	}
}
