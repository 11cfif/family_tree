package ru.cfif.cs.familytree.model;

import java.util.concurrent.atomic.AtomicLong;

public class Relation implements Comparable<Relation> {

	public static Relation createOpositeRalation(Relation relation) {
		return new Relation(relation.secondaryPerson, relation.mainPerson,
			relation.type.getOppositeType(), relation.level);
	}

	private static AtomicLong counter = new AtomicLong();

	private final long id;
	private final Person mainPerson;
	private final Person secondaryPerson;
	private final RelationType type;
	private final int level;

	public Relation(Person mainPerson, Person secondaryPerson, RelationType type, int level) {
		this.id = counter.getAndIncrement();
		this.mainPerson = mainPerson;
		this.secondaryPerson = secondaryPerson;
		this.type = type;
		this.level = level;
	}

	public Person getMainPerson() {
		return mainPerson;
	}

	public Person getSecondaryPerson() {
		return secondaryPerson;
	}

	public RelationType getType() {
		return type;
	}

	public int getLevel() {
		return level;
	}

	@Override
	public int compareTo(Relation o) {
		int res = Integer.compare(type.getDirection(), o.getType().getDirection());
		return res != 0 ? res : Integer.compare(level, o.getLevel());
	}
}
