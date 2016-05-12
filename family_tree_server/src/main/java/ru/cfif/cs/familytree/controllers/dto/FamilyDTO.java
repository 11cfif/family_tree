package ru.cfif.cs.familytree.controllers.dto;

import com.fasterxml.jackson.annotation.*;
import ru.cfif.cs.familytree.model.Family;

public class FamilyDTO {

	private final FamilyInfoDTO familyInfoDTO;
	private final NodeDTO[] nodes;
	private final EdgeDTO[] edges;

	@JsonCreator
	public FamilyDTO(@JsonProperty("familyInfo") FamilyInfoDTO familyInfoDTO,
		@JsonProperty("nodes") NodeDTO[] nodes, @JsonProperty("edges") EdgeDTO[] edges)
	{
		this.familyInfoDTO = familyInfoDTO;
		this.nodes = nodes;
		this.edges = edges;
	}

	public FamilyDTO(Family family)
	{
		this.familyInfoDTO = new FamilyInfoDTO(family.getFamilyInfo());
		this.nodes = family.getNodes().stream().map(NodeDTO::new).toArray(NodeDTO[]::new);
		this.edges = family.getEdges().stream().map(EdgeDTO::new).toArray(EdgeDTO[]::new);
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

	class NodeDTO {
		private final long id;
		private final PersonDTO main;
		private final PersonDTO[] secondary;
		private final Long[] edges;

		@JsonCreator
		public NodeDTO(@JsonProperty("id") long id, @JsonProperty("main") PersonDTO main,
			@JsonProperty("secondary") PersonDTO[] secondary, @JsonProperty("edges") Long[] edges)
		{
			this.id = id;
			this.main = main;
			this.secondary = secondary;
			this.edges = edges;
		}

		NodeDTO(Family.Node node) {
			this.id = node.getId();
			this.main = new PersonDTO(node.getMain());
			this.secondary = node.getSecondary()
				.stream()
				.map(PersonDTO::new)
				.toArray(PersonDTO[]::new);
			this.edges = node.getEdges().stream().toArray(Long[]::new);
		}

		@JsonGetter
		public long getId() {
			return id;
		}

		@JsonGetter
		public PersonDTO getMain() {
			return main;
		}

		@JsonGetter
		public PersonDTO[] getSecondary() {
			return secondary;
		}

		@JsonGetter
		public Long[] getEdges() {
			return edges;
		}
	}

	class EdgeDTO {
		private final long id;
		private final long from;
		private final long to;
		private final long parentId;

		@JsonCreator
		public EdgeDTO(@JsonProperty("id") long id, @JsonProperty("from") long from, @JsonProperty("to") long to,
			@JsonProperty("parentId") long parentId)
		{
			this.id = id;
			this.from = from;
			this.to = to;
			this.parentId = parentId;
		}

		EdgeDTO(Family.Edge edge) {
			this.id = edge.getId();
			this.from = edge.getFrom();
			this.to = edge.getTo();
			this.parentId = edge.getParentId();
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
	}
}
