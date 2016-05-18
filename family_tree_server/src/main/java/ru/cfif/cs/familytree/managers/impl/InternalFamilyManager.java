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
		childRelationMap.put(familyInfo.getId(), new ArrayList<>());
		spouseRelationMap.put(familyInfo.getId(), new ArrayList<>());
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
	public Person addSpouse(long familyId, long mainId, Person spouse,
		String dateStartRelation, String dateFinishRelation, String description)
	{
		Person person = personManager.create(spouse);
		List<SpouseRelation> relations = spouseRelationMap.get(familyId);
		if (relations == null) {
			relations = new ArrayList<>();
			spouseRelationMap.put(familyId, relations);
		}
		relations.add(new SpouseRelation(mainId, person.getId(), dateStartRelation, dateFinishRelation, description));
		return person;
	}

	@Override
	public void removeSpouse(long familyId, long spouseID) {
		personManager.delete(spouseID);
		List<SpouseRelation> relations = spouseRelationMap.get(familyId);
		if (relations == null)
			return;
		for (int i = 0; i < relations.size(); i++) {
			if (relations.get(i).secondaryId == spouseID) {
				relations.remove(i);
				return;
			}
		}
	}

	@Override
	public Person addChild(long familyId, long mainParentId, long secondaryParentId, Person child, String description) {
		Person person = personManager.create(child);
		List<ParentChildRelation> relations = childRelationMap.get(familyId);
		if (relations == null) {
			relations = new ArrayList<>();
			childRelationMap.put(familyId, relations);
		}
		relations.add(new ParentChildRelation(mainParentId, secondaryParentId, person.getId(), description));
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

		//init nodeBuilders
		AtomicInteger i = new AtomicInteger(1);
		Map<Long, FamilyTreeNode.Builder> nodeBuilders = new HashMap<>();
		nodeBuilders.put(info.getHead().getId(), new FamilyTreeNode.Builder(0, info.getHead()));
		childRelations.stream()
			.map(rel -> new FamilyTreeNode.Builder(i.getAndIncrement(), persons.get(rel.childId)))
			.forEach(builder -> nodeBuilders.put(builder.getDescendant().getId(), builder));
		spouseRelation.forEach(rel -> nodeBuilders.get(rel.mainId).addSpouse(persons.get(rel.secondaryId), rel.description));

		//init relationBuilders
		AtomicInteger j = new AtomicInteger(1);
		List<ChildRelation> relations = childRelations.stream()
			.map(rel -> new ChildRelation(
				j.getAndIncrement(),
				nodeBuilders.get(rel.mainParentId).getId(),
				nodeBuilders.get(rel.childId).getId(),
				rel.secondaryParentId,
				rel.description))
			.collect(Collectors.toList());
		//init nodeBuilders ChildRelationIndexes
		relations.forEach(rel -> nodeBuilders.get(rel.getParentNode()).addChildRelationIndex(rel.getId()));

		//init nodes
		List<FamilyTreeNode> nodes = nodeBuilders.values().stream()
			.sorted((o1, o2) -> Long.compare(o1.getId(), o2.getId()))
			.map(FamilyTreeNode.Builder::build)
			.collect(Collectors.toList());
		return new Family(info, nodes, relations);
	}

	private class ParentChildRelation {
		private final long mainParentId;
		private final long secondaryParentId;
		private final long childId;
		private final String description;

		private ParentChildRelation(long mainParentId, long secondaryParentId, long childId, String description) {
			this.mainParentId = mainParentId;
			this.secondaryParentId = secondaryParentId;
			this.childId = childId;
			this.description = description;
		}
	}

	private class SpouseRelation {
		private final long mainId;
		private final long secondaryId;
		private final String dateStartRelation;
		private final String dateFinishRelation;
		private final String description;

		private SpouseRelation(long mainId, long secondaryId, String dateStartRelation, String dateFinishRelation, String description) {
			this.mainId = mainId;
			this.secondaryId = secondaryId;
			this.dateStartRelation = dateStartRelation;
			this.dateFinishRelation = dateFinishRelation;
			this.description = description;
		}
	}
}
