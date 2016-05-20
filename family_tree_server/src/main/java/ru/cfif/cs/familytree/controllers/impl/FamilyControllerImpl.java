package ru.cfif.cs.familytree.controllers.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Required;
import ru.cfif.cs.familytree.controllers.FamilyController;
import ru.cfif.cs.familytree.controllers.dto.*;
import ru.cfif.cs.familytree.managers.FamilyManager;
import ru.cfif.cs.familytree.model.*;
import ru.cfif.cs.familytree.model.family.Family;

public class FamilyControllerImpl implements FamilyController {

	private FamilyManager familyManager;

	@Override
	public FamilyDTO load(long id) {
		final Optional<Family> maybeFamily = familyManager.load(id);
		if (maybeFamily.isPresent()) {
			return new FamilyDTO(maybeFamily.get());
		} else {
			throw new NotFoundException("No person with id " + id);
		}
	}

	@Override
	public PersonDTO addChild(long familyId, ChildRelationDTO child) {
		Person personChild = child.getChild().createPerson(familyId);
		return new PersonDTO(familyManager.addChild(familyId, child.getDescendantId(),
			child.getSpouseId(), personChild, child.getDescription()));
	}

	@Override
	public PersonDTO addSpouse(long familyId, SpouseRelationDTO spouse) {
		Person personSpouse = spouse.getSpouse().createPerson(familyId);
		return new PersonDTO(familyManager.addSpouse(familyId, spouse.getDescendantId(), personSpouse,
			spouse.getStartDate(), spouse.getFinishDate(), spouse.getDescription()));
	}

	@Override
	public void removeChild(long familyId, long childId) {
		familyManager.removeChild(familyId, childId);
	}

	@Override
	public void removeSpouse(long familyId, long spouseId) {
		familyManager.removeSpouse(familyId, spouseId);

	}

	@Override
	public List<FamilyInfoDTO> loadAllFamiliesInfo() {
		return familyManager.loadAllFamiliesInfo().stream()
			.map(FamilyInfoDTO::new)
			.collect(Collectors.toList());
	}

	@Override
	public FamilyDTO createFamily(FamilyInfoDTO family) {
		System.out.println("Inner: " + family);
		FamilyDTO res = new FamilyDTO(familyManager.createFamily(family.createFamilyInfo()));
		System.out.println("Outer: " + res);
		return res;
	}

	@Override
	public FamilyInfoDTO updateFamily(FamilyInfoDTO family) {
		System.out.println("updateFamily Inner: " + family);

		FamilyInfoDTO res = new FamilyInfoDTO(familyManager.updateFamily(family.createFamilyInfo()));
		System.out.println("updateFamily Outer: " + res);
		return res;
	}

	@Override
	public long delete(long familyId) {
		familyManager.removeFamily(familyId);
		return familyId;
	}

	@Required
	public void setFamilyManager(FamilyManager familyManager) {
		this.familyManager = familyManager;
	}
}
