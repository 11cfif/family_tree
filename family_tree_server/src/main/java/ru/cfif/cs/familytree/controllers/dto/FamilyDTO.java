package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.family.*;

public class FamilyDTO {

	private final FamilyInfoDTO familyInfoDTO;
	private final NodeDTO[] nodes;
	private final EdgeDTO[] edges;

	@JsonCreator
	public FamilyDTO(
		@JsonProperty("familyInfo") FamilyInfoDTO familyInfoDTO,
		@JsonProperty("nodes") NodeDTO[] nodes,
		@JsonProperty("edges") EdgeDTO[] edges)
	{
		this.familyInfoDTO = familyInfoDTO;
		this.nodes = nodes;
		this.edges = edges;
	}

	public FamilyDTO(Family family) {
		this.familyInfoDTO = new FamilyInfoDTO(family.getFamilyInfo());
		this.nodes = family.getNodes().stream().map(NodeDTO::new).toArray(NodeDTO[]::new);
		this.edges = family.getRelations().stream().map(EdgeDTO::new).toArray(EdgeDTO[]::new);
	}

	@JsonGetter
	public FamilyInfoDTO getFamilyInfoDTO() {
		return familyInfoDTO;
	}

	@JsonGetter
	public NodeDTO[] getNodes() {
		return nodes;
	}

	@JsonGetter
	public EdgeDTO[] getEdges() {
		return edges;
	}

	private class NodeDTO {
		private final long id;
		private final PersonDTO descendant;
		private final PersonDTO[] spouses;
		private final Long[] childRelations;
		private final String[] spouseDescriptions;

		NodeDTO(FamilyTreeNode node) {
			this.id = node.getId();
			this.descendant = new PersonDTO(node.getDescendant());
			this.spouses = node.getSpouses()
				.stream()
				.map(PersonDTO::new)
				.toArray(PersonDTO[]::new);
			this.childRelations = node.getChildRelationIndexes().stream().toArray(Long[]::new);
			this.spouseDescriptions = node.getSpouseDescriptions().stream().toArray(String[]::new);
		}

		@JsonGetter
		public long getId() {
			return id;
		}

		@JsonGetter
		public PersonDTO getDescendant() {
			return descendant;
		}

		@JsonGetter
		public PersonDTO[] getSpouses() {
			return spouses;
		}

		@JsonGetter
		public Long[] getChildRelation() {
			return childRelations;
		}

		@JsonGetter
		public String[] getSpouseDescriptions() {
			return spouseDescriptions;
		}
	}

	private class EdgeDTO {
		private final long id;
		private final long from;
		private final long to;
		private final long parentId;
		private final String description;

		EdgeDTO(ChildRelation relation) {
			this.id = relation.getId();
			this.from = relation.getParentNode();
			this.to = relation.getChildNode();
			this.parentId = relation.getParentId();
			this.description = relation.getDescription();
		}

		@JsonGetter
		public long getId() {
			return id;
		}

		@JsonGetter
		public long getFrom() {
			return from;
		}

		@JsonGetter
		public long getTo() {
			return to;
		}

		@JsonGetter
		public long getParentId() {
			return parentId;
		}

		@JsonGetter
		public String getDescription() {
			return description;
		}
	}
}
