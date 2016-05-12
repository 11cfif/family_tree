package ru.cfif.cs.familytree.model;

import java.util.*;

public class Family {

	private final FamilyInfo familyInfo;
	private final List<FamilyTreeNode> nodes;
	private final List<ChildRelation> relations;

	public Family(FamilyInfo familyInfo, List<FamilyTreeNode> nodes, List<ChildRelation> relations) {
		this.familyInfo = familyInfo;
		this.nodes = nodes;
		this.relations = relations;
	}

	public Family(FamilyInfo familyInfo) {
		this.familyInfo = familyInfo;
		this.nodes = new ArrayList<>();
		this.relations = new ArrayList<>();
	}

	public Family(FamilyInfo familyInfo, Family family) {
		this.familyInfo = familyInfo;
		this.nodes = new ArrayList<>(family.getNodes());
		this.relations = new ArrayList<>(family.getRelations());
	}

	public FamilyInfo getFamilyInfo() {
		return familyInfo;
	}

	public List<FamilyTreeNode> getNodes() {
		return nodes;
	}

	public List<ChildRelation> getRelations() {
		return relations;
	}

	public static class FamilyTreeNode {
		private final long id;
		private final Person descendant;
		private final List<Person> spouses;
		private final List<Long> childRelationIndexes;

		public FamilyTreeNode(long id, Person descendant, List<Person> spouses, List<Long> childRelationIndexes) {
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
	}


	public static class ChildRelation {
		private final long id;
		private final long parentNode;
		private final long childNode;
		private final long parentId;

		public ChildRelation(long id, long parentNode, long childNode, ParentChildRelation relation) {
			this.id = id;
			this.parentNode = parentNode;
			this.childNode = childNode;
			this.parentId = relation.getSecondaryParentId();
		}

		public long getParentNode() {
			return parentNode;
		}

		public long getChildNode() {
			return childNode;
		}

		public long getParentId() {
			return parentId;
		}

		public long getId() {
			return id;
		}
	}
}
