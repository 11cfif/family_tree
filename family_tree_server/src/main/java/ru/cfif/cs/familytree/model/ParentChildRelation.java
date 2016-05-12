package ru.cfif.cs.familytree.model;

public class ParentChildRelation {

	private final long mainParentId;
	private final long secondaryParentId;
	private final long childId;
	private final String description;

	private ParentChildRelation(long mainParentId, long secondaryParentId, long childId, String description) {
		this.mainParentId = mainParentId;
		this.secondaryParentId = secondaryParentId;
		this.childId = childId;
		this.description = description;
	}

	public long getMainParentId() {
		return mainParentId;
	}

	public long getSecondaryParentId() {
		return secondaryParentId;
	}

	public long getChildId() {
		return childId;
	}

	public String getDescription() {
		return description;
	}
}