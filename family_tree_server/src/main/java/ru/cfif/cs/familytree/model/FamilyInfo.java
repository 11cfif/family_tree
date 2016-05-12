package ru.cfif.cs.familytree.model;

public class FamilyInfo {

	public static final long FAKE_ID = -1;

	private final long id;
	private final String name;
	private final String description;
	private final Person head;

	public FamilyInfo(String name, String description, Person head) {
		this.id = FAKE_ID;
		this.name = name;
		this.description = description;
		this.head = head;
	}

	public FamilyInfo(long id, FamilyInfo familyInfo) {
		this.id = id;
		this.name = familyInfo.getName();
		this.description = familyInfo.getDescription();
		this.head = familyInfo.getHead();
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
