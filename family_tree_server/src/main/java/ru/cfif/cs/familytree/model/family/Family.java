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
		this.relations = new ArrayList<>();
	}

	public Family(FamilyInfo familyInfo, Family family) {
		this.familyInfo = familyInfo;
		this.nodes = new ArrayList<>(family.getNodes());
		this.relations = new ArrayList<>(family.getRelations());
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
