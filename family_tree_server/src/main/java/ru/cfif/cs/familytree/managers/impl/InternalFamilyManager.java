package ru.cfif.cs.familytree.managers.impl;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Required;
import ru.cfif.cs.familytree.controllers.dto.FamilyInfoDTO;
import ru.cfif.cs.familytree.managers.FamilyManager;
import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.*;

public class InternalFamilyManager implements FamilyManager {

	private static final AtomicLong COUNTER = new AtomicLong();

	private final Map<Long, Family> familyMap = new HashMap<>();
	private final Map<Long, Family> familyMap = new HashMap<>();
	private final Map<Long, Family> familyMap = new HashMap<>();

	private PersonManager personManager;

	@Override
	public Family createFamily(FamilyInfo familyInfo) {
		personManager.create(familyInfo.getHead());
		FamilyInfo familyInfoWithId = new FamilyInfo(COUNTER.getAndIncrement(), familyInfo);
		Family family = new Family(familyInfoWithId);
		familyMap.put(familyInfoWithId.getId(), family);
		return family;
	}

	@Override
	public Optional<Family> load(long familyId) {
		return Optional.of(familyMap.get(familyId));
	}

	@Override
	public FamilyInfo updateFamily(FamilyInfo familyInfo) {
		Family family = new Family(familyInfo, familyMap.get(familyInfo.getId()));
		familyMap.put(familyInfo.getId(), family);
		return family;
	}

	@Override
	public void removeFamily(long familyId) {
		familyMap.remove(familyId);
	}

	@Override
	public void addSpouse(long familyId, long spouseId, Person spouse,
		String description, String dateStartRelation, String DateFinishRelation)
	{

	}

	@Override
	public void removeSpouse(long familyId, long spouseID) {

	}

	@Override
	public void addChild(long familyId, long mainParentId, long secondaryParentId, Person child, String description) {

	}

	@Override
	public void removeChild(long familyId, long childId) {

	}

	@Override
	public List<FamilyInfoDTO> loadAllFamiliesInfo() {
		return null;
	}

	@Required
	public void setPersonManager(final PersonManager personManager) {
		this.personManager = personManager;
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
		private final String start;
		private final String finish;
		private final String description;

		private SpouseRelation(long mainId, long secondaryId, String start, String finish, String description) {
			this.mainId = mainId;
			this.secondaryId = secondaryId;
			this.start = start;
			this.finish = finish;
			this.description = description;
		}
	}
}
