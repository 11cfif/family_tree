package ru.cfif.cs.familytree.model.family;


public class ChildRelation {
	private final long id;
	private final long parentNode;
	private final long childNode;
	private final long parentId;
	private final String description;

	public ChildRelation(long id, long parentNode, long childNode, long secondaryParentId, String description) {
		this.id = id;
		this.parentNode = parentNode;
		this.childNode = childNode;
		this.parentId = secondaryParentId;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	//	public static final class Builder {
//		private final long id;
//		private final long parentNode;
//		private long childNode;
//		private long parentId;
//
//		public Builder(long id, long parentNode) {
//			this.id = id;
//			this.parentNode = parentNode;
//		}
//
//		public FamilyTreeNode.Builder addSpouse(Person spouse) {
//			spouses.add(spouse);
//			return this;
//		}
//
//		public FamilyTreeNode.Builder addSpouse(long index) {
//			childRelationIndexes.add(index);
//			return this;
//		}
//
//		public FamilyTreeNode build() {
//			return new FamilyTreeNode(id, descendant, spouses, childRelationIndexes);
//		}
//	}
}
