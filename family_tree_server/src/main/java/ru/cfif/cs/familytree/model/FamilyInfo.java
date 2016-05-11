package ru.cfif.cs.familytree.model;

import java.util.concurrent.atomic.AtomicLong;

public class FamilyInfo {

	private static final AtomicLong counter = new AtomicLong();


	private final long id;
	private final String name;
	private final String description;
	private final Person head;

	public FamilyInfo(int id, String name, String description, Person head) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.head = head;
	}

	public FamilyInfo(String name, String description, Person head) {
		id = counter.getAndIncrement();
		this.name = name;
		this.description = description;
		this.head = head;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public Person getHead() {
		return head;
	}
}
