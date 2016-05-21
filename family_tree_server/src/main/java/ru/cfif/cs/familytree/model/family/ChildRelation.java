package ru.cfif.cs.familytree.model.family;


public class ChildRelation {
	private final long id;
	private final long parentNode;
	private final long childNode;
	private final long spouseParentId;

	public ChildRelation(long id, long parentNode, long childNode, long spouseParentId) {
		this.id = id;
		this.parentNode = parentNode;
		this.childNode = childNode;
		this.spouseParentId = spouseParentId;
	}

	public long getParentNode() {
		return parentNode;
	}

	public long getChildNode() {
		return childNode;
	}

	public long getSpouseParentId() {
		return spouseParentId;
	}

	public long getId() {
		return id;
	}
}
