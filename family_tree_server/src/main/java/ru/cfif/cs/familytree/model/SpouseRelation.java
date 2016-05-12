package ru.cfif.cs.familytree.model;

public class SpouseRelation implements Comparable<SpouseRelation> {
	private final long mainId;
	private final long secondaryId;
	private final String start;
	private final String finish;
	private final String description;

	private SpouseRelation(long mainId, long secondaryId, String start, String finish, String description) {
		this.mainId = mainId;
		this.secondaryId = secondaryId;
		this.start = start;
		this.finish = finish;
		this.description = description;
	}

	public long getMainId() {
		return mainId;
	}

	public long getSecondaryId() {
		return secondaryId;
	}

	public String getStart() {
		return start;
	}

	public String getFinish() {
		return finish;
	}

	public String getDescription() {
		return description;
	}

	@Override
	public int compareTo(SpouseRelation o) {
		int res = start.compareTo(finish);
		if (res != 0)
			return res;
		return finish.compareTo(finish);
	}
}
