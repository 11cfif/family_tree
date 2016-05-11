package ru.cfif.cs.familytree.managers;

import java.util.Collection;
import java.util.Optional;

import ru.cfif.cs.familytree.model.Family;
import ru.cfif.cs.familytree.model.FamilyInfo;

public interface FamalyManager {

	Family createFamily(FamilyInfo familyInfo);

	Optional<Family> load(long familyId);

	void removeFamily(long familyId);

	void addSpouse(long familyId, long personId, long spouseId);

	void removeSpouse(long familyId, long personId, long spouseId);

	void addChildren(long familyId, long parentId, Collection<Long> childrenIds);

	void removeChildren(long familyId, long personId, Collection<Long> childrenIds);
}
