package ru.cfif.cs.familytree.model.family;

import java.util.ArrayList;
import java.util.List;

import ru.cfif.cs.familytree.model.Person;

public class FamilyTreeNode {
	private final long id;
	private final Person descendant;
	private final List<Person> spouses;
	private final List<Long> childRelationIndexes;

	private FamilyTreeNode(long id, Person descendant, List<Person> spouses, List<Long> childRelationIndexes) {
		this.id = id;
		this.descendant = descendant;
		this.spouses = spouses;
		this.childRelationIndexes = childRelationIndexes;
	}

	public long getId() {
		return id;
	}

	public Person getDescendant() {
		return descendant;
	}

	public List<Person> getSpouses() {
		return spouses;
	}

	public List<Long> getChildRelationIndexes() {
		return childRelationIndexes;
	}

	public static final class Builder {
		private final long id;
		private final Person descendant;
		private final List<Person> spouses = new ArrayList<>();
		private final List<Long> childRelationIndexes = new ArrayList<>();

		public Builder(long id, Person descendant) {
			this.id = id;
			this.descendant = descendant;
		}

		public Builder addSpouse(Person spouse) {
			spouses.add(spouse);
			return this;
		}

		public Builder addChildRelationIndex(long index) {
			childRelationIndexes.add(index);
			return this;
		}

		public FamilyTreeNode build() {
			return new FamilyTreeNode(id, descendant, spouses, childRelationIndexes);
		}

		public long getId() {
			return id;
		}

		public Person getDescendant() {
			return descendant;
		}
	}
}
