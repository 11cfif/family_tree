package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class ChildRelationDTO {

	private final long mainId;
	private final long secondaryId;
	private final String description;
	private final PersonDTO child;

	@JsonCreator
	public ChildRelationDTO(@JsonProperty("mainId") long mainId, @JsonProperty("secondaryId") long secondaryId,
		@JsonProperty("description") String description, @JsonProperty("child") PersonDTO child)
	{
		this.mainId = mainId;
		this.secondaryId = secondaryId;
		this.description = description;
		this.child = child;
	}

	@JsonGetter
	public long getMainId() {
		return mainId;
	}

	@JsonGetter
	public long getSecondaryId() {
		return secondaryId;
	}

	@JsonGetter
	public String getDescription() {
		return description;
	}

	@JsonGetter
	public PersonDTO getChild() {
		return child;
	}
}
