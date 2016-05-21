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

	Person addSpouse(long familyId, long descendantId, Person spouse);

	void removeSpouse(long familyId, long spouseID);

	Person addChild(long familyId, long descendantParentId, long spouseParentId, Person child);

	void removeChild(long familyId, long childId);

	List<FamilyInfo> loadAllFamiliesInfo();

}
