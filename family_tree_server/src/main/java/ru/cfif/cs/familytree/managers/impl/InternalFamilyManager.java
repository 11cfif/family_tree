package ru.cfif.cs.familytree.managers.impl;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Required;
import ru.cfif.cs.familytree.managers.FamilyManager;
import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.Person;
import ru.cfif.cs.familytree.model.family.*;

public class InternalFamilyManager implements FamilyManager {

	private static final AtomicLong COUNTER = new AtomicLong(1);

	private final Map<Long, List<ParentChildRelation>> childRelationMap = new HashMap<>();
	private final Map<Long, List<SpouseRelation>> spouseRelationMap = new HashMap<>();
	private final Map<Long, FamilyInfo> familyInfoMap = new HashMap<>();

	private PersonManager personManager;

	@Override
	public Family createFamily(FamilyInfo familyInfo) {
		long familyId = COUNTER.getAndIncrement();
		Person head = personManager.create(familyId, familyInfo.getHead());
		FamilyInfo familyInfoWithId = new FamilyInfo(familyId,
			familyInfo.getName(), familyInfo.getDescription(), head);
		familyInfoMap.put(familyInfoWithId.getId(), familyInfoWithId);
		childRelationMap.put(familyInfoWithId.getId(), new ArrayList<>());
		spouseRelationMap.put(familyInfoWithId.getId(), new ArrayList<>());
		return new Family(familyInfoWithId);
	}

	@Override
	public Optional<Family> load(long familyId) {
		return Optional.of(loadImpl(familyId));
	}

	@Override
	public FamilyInfo updateFamily(FamilyInfo familyInfo) {
		familyInfoMap.put(familyInfo.getId(), familyInfo);
		return familyInfo;
	}

	@Override
	public void removeFamily(long familyId) {
		familyInfoMap.remove(familyId);
	}

	@Override
	public Person addSpouse(long familyId, long descendantId, Person spouse) {
		Person person = personManager.create(spouse);
		List<SpouseRelation> relations = spouseRelationMap.get(familyId);
		if (relations == null) {
			relations = new ArrayList<>();
			spouseRelationMap.put(familyId, relations);
		}
		relations.add(new SpouseRelation(descendantId, person.getId()));
		return person;
	}

	@Override
	public void removeSpouse(long familyId, long spouseID) {
		personManager.delete(spouseID);
		List<SpouseRelation> relations = spouseRelationMap.get(familyId);
		if (relations == null)
			return;
		for (int i = 0; i < relations.size(); i++) {
			if (relations.get(i).spouseId == spouseID) {
				relations.remove(i);
				return;
			}
		}
	}

	@Override
	public Person addChild(long familyId, long descendantParentId, long spouseParentId, Person child) {
		Person person = personManager.create(child);
		List<ParentChildRelation> relations = childRelationMap.get(familyId);
		if (relations == null) {
			relations = new ArrayList<>();
			childRelationMap.put(familyId, relations);
		}
		relations.add(new ParentChildRelation(descendantParentId, spouseParentId, person.getId()));
		return person;
	}

	@Override
	public void removeChild(long familyId, long childId) {
		personManager.delete(childId);
		List<ParentChildRelation> relations = childRelationMap.get(familyId);
		if (relations == null)
			return;
		for (int i = 0; i < relations.size(); i++) {
			if (relations.get(i).childId == childId) {
				relations.remove(i);
				return;
			}
		}
	}

	@Override
	public List<FamilyInfo> loadAllFamiliesInfo() {
		return new ArrayList<>(familyInfoMap.values());
	}

	@Required
	public void setPersonManager(final PersonManager personManager) {
		this.personManager = personManager;
	}

	private Family loadImpl(long familyId) {
		//init collections
		FamilyInfo info = familyInfoMap.get(familyId);
		Map<Long, Person> persons = new HashMap<>();
		personManager.loadAllByFamilyIndex(familyId).forEach(person -> persons.put(person.getId(), person));
		List<ParentChildRelation> childRelations = childRelationMap.get(familyId);
		List<SpouseRelation> spouseRelation = spouseRelationMap.get(familyId);

		//init nodeBuildersByDescendantId
		AtomicInteger i = new AtomicInteger(1);
		Map<Long, FamilyTreeNode.Builder> nodeBuildersByDescendantId = new HashMap<>();
		nodeBuildersByDescendantId.put(info.getHead().getId(), new FamilyTreeNode.Builder(0, info.getHead()));
		childRelations.stream()
			.map(rel -> new FamilyTreeNode.Builder(i.getAndIncrement(), persons.get(rel.childId)))
			.forEach(builder -> nodeBuildersByDescendantId.put(builder.getDescendant().getId(), builder));
		spouseRelation.forEach(rel -> nodeBuildersByDescendantId.get(rel.descendantId).addSpouse(persons.get(rel.spouseId)));
		List<FamilyTreeNode.Builder> nodeBuilders = new ArrayList<>(nodeBuildersByDescendantId.values());
		Collections.sort(nodeBuilders, (o1, o2) -> Long.compare(o1.getId(), o2.getId()));
		//init relationBuilders
		AtomicInteger j = new AtomicInteger(0);
		List<ChildRelation> relations = childRelations.stream()
			.map(rel -> new ChildRelation(
				j.getAndIncrement(),
				nodeBuildersByDescendantId.get(rel.descendantParentId).getId(),
				nodeBuildersByDescendantId.get(rel.childId).getId(),
				rel.spouseParentId))
			.collect(Collectors.toList());
		//init nodeBuildersByDescendantId ChildRelationIndexes
		relations.forEach(rel -> nodeBuilders
			.get((int)rel.getParentNode())
			.addChildRelationIndex(rel.getId()));

		//init nodes
		List<FamilyTreeNode> nodes = nodeBuildersByDescendantId.values().stream()
			.sorted((o1, o2) -> Long.compare(o1.getId(), o2.getId()))
			.map(FamilyTreeNode.Builder::build)
			.collect(Collectors.toList());
		return new Family(info, nodes, relations);
	}

	private class ParentChildRelation {
		private final long descendantParentId;
		private final long spouseParentId;
		private final long childId;

		private ParentChildRelation(long descendantParentId, long spouseParentId, long childId) {
			this.descendantParentId = descendantParentId;
			this.spouseParentId = spouseParentId;
			this.childId = childId;
		}
	}

	private class SpouseRelation {
		private final long descendantId;
		private final long spouseId;

		private SpouseRelation(long descendantId, long spouseId) {
			this.descendantId = descendantId;
			this.spouseId = spouseId;
		}
	}
}
