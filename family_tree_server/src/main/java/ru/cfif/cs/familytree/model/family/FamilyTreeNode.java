package ru.cfif.cs.familytree.model.family;

import java.util.ArrayList;
import java.util.List;

import ru.cfif.cs.familytree.model.Person;

public class FamilyTreeNode {
	private final long id;
	private final Person descendant;
	private final List<Person> spouses;
	private final List<Long> childRelationIndexes;
	private final List<String> spouseDescriptions;

	private FamilyTreeNode(long id, Person descendant, List<Person> spouses, List<Long> childRelationIndexes,
		List<String> spouseDescriptions) {
		this.id = id;
		this.descendant = descendant;
		this.spouses = spouses;
		this.childRelationIndexes = childRelationIndexes;
		this.spouseDescriptions = spouseDescriptions;
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

	public List<String> getSpouseDescriptions() {
		return spouseDescriptions;
	}

	public static final class Builder {
		private final long id;
		private final Person descendant;
		private final List<Person> spouses = new ArrayList<>();
		private final List<Long> childRelationIndexes = new ArrayList<>();
		private final List<String> spouseDescriptions = new ArrayList<>();

		public Builder(long id, Person descendant) {
			this.id = id;
			this.descendant = descendant;
		}

		public Builder addSpouse(Person spouse, String description) {
			spouses.add(spouse);
			spouseDescriptions.add(description);
			return this;
		}

		public Builder addChildRelationIndex(long index) {
			childRelationIndexes.add(index);
			return this;
		}

		public FamilyTreeNode build() {
			return new FamilyTreeNode(id, descendant, spouses, childRelationIndexes, spouseDescriptions);
		}

		public long getId() {
			return id;
		}

		public Person getDescendant() {
			return descendant;
		}
	}
}
