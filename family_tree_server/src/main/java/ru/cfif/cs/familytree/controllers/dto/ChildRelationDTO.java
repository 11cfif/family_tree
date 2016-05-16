package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class ChildRelationDTO {

	private final long mainId;
	private final long secondaryId;
	private final String description;
	private final PersonDTO child;

	@JsonCreator
	public ChildRelationDTO(
		@JsonProperty("mainId") long mainId,
		@JsonProperty("secondaryId") long secondaryId,
		@JsonProperty("description") String description,
		@JsonProperty("child") PersonDTO child)
	{
		this.mainId = mainId;
		this.secondaryId = secondaryId;
		this.description = description;
		this.child = child;
	}

	public long getMainId() {
		return mainId;
	}

	public long getSecondaryId() {
		return secondaryId;
	}

	public String getDescription() {
		return description;
	}

	public PersonDTO getChild() {
		return child;
	}

	@Override
	public String toString() {
		return "ChildRelationDTO{" +
			"mainId=" + mainId +
			", secondaryId=" + secondaryId +
			", description='" + description + '\'' +
			", child=" + child +
			'}';
	}
}
