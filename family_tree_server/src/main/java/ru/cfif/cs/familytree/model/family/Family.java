package ru.cfif.cs.familytree.model.family;

import java.util.ArrayList;
import java.util.List;

public class Family {

	private final FamilyInfo familyInfo;
	private final List<FamilyTreeNode> nodes;
	private final List<ChildRelation> relations;

	public Family(FamilyInfo familyInfo, List<FamilyTreeNode> nodes, List<ChildRelation> relations) {
		this.familyInfo = familyInfo;
		this.nodes = nodes;
		this.relations = relations;
	}

	public Family(FamilyInfo familyInfo) {
		this.familyInfo = familyInfo;
		this.nodes = new ArrayList<>();
		nodes.add(new FamilyTreeNode.Builder(0, familyInfo.getHead()).build());
		this.relations = new ArrayList<>();
	}

	public FamilyInfo getFamilyInfo() {
		return familyInfo;
	}

	public List<FamilyTreeNode> getNodes() {
		return nodes;
	}

	public List<ChildRelation> getRelations() {
		return relations;
	}
}
