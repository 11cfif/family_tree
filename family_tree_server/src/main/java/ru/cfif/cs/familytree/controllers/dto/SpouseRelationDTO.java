package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class SpouseRelationDTO {
	private final long spouseId;
	private final String startDate;
	private final String finishDate;
	private final String description;
	private final PersonDTO spouse;

	@JsonCreator
	public SpouseRelationDTO(
		@JsonProperty("spouseId") long spouseId,
		@JsonProperty("secondaryId") long secondaryId,
		@JsonProperty("description") String description,
		@JsonProperty("startDate") String startDate,
		@JsonProperty("finishDate") String finishDate,
		@JsonProperty("child") PersonDTO spouse)
	{
		this.spouseId = spouseId;
		this.description = description;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.spouse = spouse;
	}

	public long getSpouseId() {
		return spouseId;
	}

	public String getDescription() {
		return description;
	}

	public String getStartDate() {
		return startDate;
	}

	public String getFinishDate() {
		return finishDate;
	}

	public PersonDTO getSpouse() {
		return spouse;
	}
}
