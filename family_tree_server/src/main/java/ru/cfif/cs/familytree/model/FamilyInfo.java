package ru.cfif.cs.familytree.model;

import java.util.concurrent.atomic.AtomicLong;

public class FamilyInfo {

	private static final AtomicLong counter = new AtomicLong();


	private final long id;
	private final String name;
	private final String description;
	private final Person head;

	public FamilyInfo(long id, String name, String description, Person head) {
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

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		FamilyInfo other = (FamilyInfo)o;
		if (id != other.id)
			return false;
		if (name != null ? !name.equals(other.name) : other.name != null)
			return false;
		if (description != null ? !description.equals(other.description) : other.description != null)
			return false;
		return head != null ? head.equals(other.head) : other.head == null;

	}

	@Override
	public int hashCode() {
		int result = (int)(id ^ (id >>> 32));
		result = 31 * result + (name != null ? name.hashCode() : 0);
		result = 31 * result + (description != null ? description.hashCode() : 0);
		result = 31 * result + (head != null ? head.hashCode() : 0);
		return result;
	}
}
