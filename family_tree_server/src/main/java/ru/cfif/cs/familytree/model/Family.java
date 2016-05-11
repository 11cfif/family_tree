package ru.cfif.cs.familytree.model;

import java.util.*;

public class Family {

	private final FamilyInfo familyInfo;
	private  Map<Person, List<Relation>> family;

	public Family(FamilyInfo familyInfo, Map<Person, List<Relation>> family) {
		this.familyInfo = familyInfo;
		this.family = family;
	}

	public Family(FamilyInfo familyInfo) {
		this.familyInfo = familyInfo;
//		family = new HashMap<>();
//		family.put(head, new ArrayList<>());
	}

	public void addRelation(Relation relation) {
		List<Relation> list = family.get(relation.getMainPerson());
		List<Relation> oppositeList = family.get(relation.getSecondaryPerson());
		if (list == null)
			throw new IllegalArgumentException();
		int id = -Collections.binarySearch(list, relation) - 1;
		list.add(id, relation);
		Relation opposite = Relation.createOpositeRalation(relation);
		if (oppositeList == null) {
			oppositeList = new ArrayList<>();
			family.put(opposite.getMainPerson(), oppositeList);
		}
		id = -Collections.binarySearch(oppositeList, opposite) - 1;
		oppositeList.add(id, opposite);
	}

	public void removeRelation(Relation relation) {
		List<Relation> list = family.get(relation.getMainPerson());
		List<Relation> oppositeList = family.get(relation.getSecondaryPerson());
		if (list == null || oppositeList == null)
			throw new IllegalArgumentException();
		int id = Collections.binarySearch(list, relation);
		assert id >= 0;
		list.remove(id);
		removeOppositeRelation(relation, oppositeList);
	}

	public void removePerson(Person person) {
		List<Relation> list = family.remove(person);
		if (list == null)
			throw new IllegalArgumentException();
		for (Relation relation : list)
			removeOppositeRelation(relation, family.get(relation.getSecondaryPerson()));
	}

	private void removeOppositeRelation(Relation relation, List<Relation> oppositeList) {
		int id;
		id = Collections.binarySearch(oppositeList, Relation.createOpositeRalation(relation)) ;
		assert id >= 0;
		oppositeList.remove(id);
	}
}
