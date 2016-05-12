package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.FamilyInfo;

public class FamilyInfoDTO {

	private final long id;
	private final String name;
	private final String description;
	private final PersonDTO head;


	@JsonCreator
	public FamilyInfoDTO(
		@JsonProperty("id") long id,
		@JsonProperty("name") String name,
		@JsonProperty("description") String description,
		@JsonProperty("head") PersonDTO head)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.head = head;
	}

	public FamilyInfoDTO(FamilyInfo familyInfo) {
		this.id = familyInfo.getId();
		this.name = familyInfo.getName();
		this.description = familyInfo.getDescription();
		this.head = new PersonDTO(familyInfo.getHead());
	}

	@JsonGetter
	public long getId() {
		return id;
	}

	@JsonGetter
	public String getName() {
		return name;
	}

	@JsonGetter
	public String getDescription() {
		return description;
	}

	@JsonGetter
	public PersonDTO getHead() {
		return head;
	}

	public FamilyInfo createFamilyInfo() {
		return new FamilyInfo(id, name, description, head.createPerson(id));
	}
}
