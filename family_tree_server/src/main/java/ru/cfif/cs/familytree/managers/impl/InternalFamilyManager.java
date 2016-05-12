package ru.cfif.cs.familytree.managers.impl;

import java.util.*;

import ru.cfif.cs.familytree.controllers.dto.FamilyInfoDTO;
import ru.cfif.cs.familytree.managers.FamilyManager;
import ru.cfif.cs.familytree.model.*;

public class InternalFamilyManager implements FamilyManager {

	private final Map<Long, Family> familyMap = new HashMap<>();


	@Override
	public Family createFamily(FamilyInfo familyInfo) {
		Family family = new Family(familyInfo);
		familyMap.put(familyInfo.getId(), family);
		return family;
	}

	@Override
	public Optional<Family> load(long familyId) {
		return Optional.of(familyMap.get(familyId));
	}

	@Override
	public Family updateFamily(FamilyInfo familyInfo) {
		return null;
	}

	@Override
	public void removeFamily(long familyId) {
		familyMap.remove(familyId);
	}

	@Override
	public void addSpouse(long familyId, long spouseId, Person spouse, String description, String start,
		String finish)
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
