package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class SpouseRelationDTO {
	private final long descendantId;
	private final PersonDTO spouse;

	@JsonCreator
	public SpouseRelationDTO(
		@JsonProperty("descendantId") long descendantId,
		@JsonProperty("description") String description,
		@JsonProperty("startDate") String startDate,
		@JsonProperty("finishDate") String finishDate,
		@JsonProperty("spouse") PersonDTO spouse)
	{
		this.descendantId = descendantId;
		this.spouse = spouse;
	}

	public long getDescendantId() {
		return descendantId;
	}

	public PersonDTO getSpouse() {
		return spouse;
	}

	@Override
	public String toString() {
		return "SpouseRelationDTO{" +
			"descendantId=" + descendantId +
			", spouse=" + spouse +
			'}';
	}
}
