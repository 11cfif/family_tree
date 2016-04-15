package ru.cfif.cs.familytree.model;


import java.util.concurrent.atomic.AtomicLong;

public class Person {

	private static final AtomicLong counter = new AtomicLong();

	private final long id;
	private final String name;
	private final String surname;

	public Person(String name, String surname) {
		this.name = name;
		this.surname = surname;
		this.id = counter.getAndIncrement();
	}

	public Person(long id, String name, String surname) {
		this.id = id;
		this.name = name;
		this.surname = surname;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public long getId() {
		return id;
	}
}
