package ru.cfif.cs.familytree.controllers.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ws.rs.NotFoundException;

import ru.cfif.cs.familytree.controllers.PersonController;
import ru.cfif.cs.familytree.controllers.dto.PersonDTO;
import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.Person;

public class PersonControllerImpl implements PersonController {

	private PersonManager personManager;

	public PersonControllerImpl() {
	}

	@Override
	public List<PersonDTO> loadAllByFamilyIndex(long familyId) {
		return personManager.loadAllByFamilyIndex(familyId).stream()
			.map(PersonDTO::new)
			.collect(Collectors.toList());
	}



	@Override
	public PersonDTO load(long id) {
		final Optional<Person> maybePerson = personManager.load(id);
		if (maybePerson.isPresent()) {
			return new PersonDTO(maybePerson.get());
		} else {
			throw new NotFoundException("No person with id " + id);
		}
	}

	@Override
	public PersonDTO save(PersonDTO person) {
		return new PersonDTO(personManager.create(new Person(person.getName(), person.getSurname(), person.getBirthday(), person.getDeathday())));
	}

	@Override
	public PersonDTO update(PersonDTO person) {
		return new PersonDTO(personManager.update(new Person(person.getId(), person.getName(), person.getSurname(), person.getBirthday(), person.getDeathday())));
	}

	@Override
	public void delete(long id) {
		personManager.delete(id);
	}

	public void setPersonManager(PersonManager personManager) {
		this.personManager = personManager;
	}

	public PersonManager getPersonManager() {
		return personManager;
	}
}
