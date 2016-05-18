package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class ChildRelationDTO {

	private final long descendantId;
	private final long spouseId;
	private final String description;
	private final PersonDTO child;

	@JsonCreator
	public ChildRelationDTO(
		@JsonProperty("descendantId") long descendantId,
		@JsonProperty("spouseId") long spouseId,
		@JsonProperty("description") String description,
		@JsonProperty("child") PersonDTO child)
	{
		this.descendantId = descendantId;
		this.spouseId = spouseId;
		this.description = description;
		this.child = child;
	}

	public long getDescendantId() {
		return descendantId;
	}

	public long getSpouseId() {
		return spouseId;
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
			"descendantId=" + descendantId +
			", spouseId=" + spouseId +
			", description='" + description + '\'' +
			", child=" + child +
			'}';
	}
}
