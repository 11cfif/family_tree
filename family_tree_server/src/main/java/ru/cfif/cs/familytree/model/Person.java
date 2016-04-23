package ru.cfif.cs.familytree.model;


import java.util.concurrent.atomic.AtomicLong;

public class Person {

	private static final AtomicLong counter = new AtomicLong();

	private final long id;
	private final String name;
	private final String surname;
	private final String birthday;

	public Person(String name, String surname, String birthday) {
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
		this.id = counter.getAndIncrement();
	}

	public Person(long id, String name, String surname, String birthday) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
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

	public long getId() {
		return id;
	}
}
