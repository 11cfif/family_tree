package ru.cfif.cs.familytree.managers;

import java.util.List;
import java.util.Optional;

import ru.cfif.cs.familytree.model.Person;
import ru.cfif.cs.familytree.model.family.Family;
import ru.cfif.cs.familytree.model.family.FamilyInfo;

public interface FamilyManager {

	Family createFamily(FamilyInfo familyInfo);

	Optional<Family> load(long familyId);

	FamilyInfo updateFamily(FamilyInfo familyInfo);

	void removeFamily(long familyId);

	void addSpouse(long familyId, long mainId, Person spouse, String dateStartRelation, String dateFinishRelation,
		String description);

	void removeSpouse(long familyId, long spouseID);

	void addChild(long familyId, long mainParentId, long secondaryParentId, Person child, String description);

	void removeChild(long familyId, long childId);

	List<FamilyInfo> loadAllFamiliesInfo();

}
