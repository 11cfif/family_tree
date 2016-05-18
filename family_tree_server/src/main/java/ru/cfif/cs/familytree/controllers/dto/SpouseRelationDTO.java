package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;

public class SpouseRelationDTO {
	private final long descendantId;
	private final String startDate;
	private final String finishDate;
	private final String description;
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
		this.description = description;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.spouse = spouse;
	}

	public long getDescendantId() {
		return descendantId;
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

	@Override
	public String toString() {
		return "SpouseRelationDTO{" +
			"descendantId=" + descendantId +
			", startDate='" + startDate + '\'' +
			", finishDate='" + finishDate + '\'' +
			", description='" + description + '\'' +
			", spouse=" + spouse +
			'}';
	}
}
