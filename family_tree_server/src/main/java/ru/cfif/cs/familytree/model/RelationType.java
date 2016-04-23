package ru.cfif.cs.familytree.model;

import java.util.HashMap;
import java.util.Map;

public enum RelationType {

	PARENT(1),
	SIBLINGS(0),
	MARRIAGE(0),
	CHILD(-1);

	private final static Map<Integer, RelationType> TYPE_BY_DIRECTION = new HashMap<>(RelationType.values().length);

	static {
		for (RelationType type : values()) {
			TYPE_BY_DIRECTION.put(type.getDirection(), type);
		}
	}


	private final int direction;

	RelationType(int direction) {
		this.direction = direction;
	}

	public int getDirection() {
		return direction;
	}

	public RelationType getOppositeType() {
		return TYPE_BY_DIRECTION.get(direction * -1);
	}
}
