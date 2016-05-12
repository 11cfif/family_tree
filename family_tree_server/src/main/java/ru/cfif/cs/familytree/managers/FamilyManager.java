package ru.cfif.cs.familytree.managers;

import java.util.List;
import java.util.Optional;

import ru.cfif.cs.familytree.controllers.dto.FamilyInfoDTO;
import ru.cfif.cs.familytree.model.*;

public interface FamilyManager {

	Family createFamily(FamilyInfo familyInfo);

	Optional<Family> load(long familyId);

	FamilyInfo updateFamily(FamilyInfo familyInfo);

	void removeFamily(long familyId);

	void addSpouse(long familyId, long spouseId, Person spouse, String description, String start, String finish);

	void removeSpouse(long familyId, long spouseID);

	void addChild(long familyId, long mainParentId, long secondaryParentId, Person child, String description);

	void removeChild(long familyId, long childId);

	List<FamilyInfoDTO> loadAllFamiliesInfo();

}
