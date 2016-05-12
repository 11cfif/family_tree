package ru.cfif.cs.familytree.model;

import java.util.*;

public class Family {

	private final FamilyInfo familyInfo;
	private final List<Node> nodes;
	private final List<Edge> edges;

	public Family(FamilyInfo familyInfo, List<Node> nodes, List<Edge> edges) {
		this.familyInfo = familyInfo;
		this.nodes = nodes;
		this.edges = edges;
	}

	public Family(FamilyInfo familyInfo) {
		this.familyInfo = familyInfo;
		this.nodes = new ArrayList<>();
		this.edges = new ArrayList<>();
	}

	public FamilyInfo getFamilyInfo() {
		return familyInfo;
	}

	public List<Node> getNodes() {
		return nodes;
	}

	public List<Edge> getEdges() {
		return edges;
	}

	public static class Node {
		private final long id;
		private final Person main;
		private final List<Person> secondary;
		private final List<Long> edges;

		public Node(long id, Person main, List<Person> secondary, List<Long> edges) {
			this.id = id;
			this.main = main;
			this.secondary = secondary;
			this.edges = edges;
		}

		public long getId() {
			return id;
		}

		public Person getMain() {
			return main;
		}

		public List<Person> getSecondary() {
			return secondary;
		}

		public List<Long> getEdges() {
			return edges;
		}
	}


	public static class Edge {
		private final long id;
		private final long from;
		private final long to;
		private final long parentId;

		public Edge(long id, long from, long to, ParentChildRelation relation) {
			this.id = id;
			this.from = from;
			this.to = to;
			this.parentId = relation.getSecondaryParentId();
		}

		public long getFrom() {
			return from;
		}

		public long getTo() {
			return to;
		}

		public long getParentId() {
			return parentId;
		}

		public long getId() {
			return id;
		}
	}
}
