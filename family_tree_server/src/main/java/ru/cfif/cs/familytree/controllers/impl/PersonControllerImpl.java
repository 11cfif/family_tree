package ru.cfif.cs.familytree.controllers.impl;

import java.util.Optional;
import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Required;
import ru.cfif.cs.familytree.controllers.PersonController;
import ru.cfif.cs.familytree.controllers.dto.PersonDTO;
import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.Person;

public class PersonControllerImpl implements PersonController {

	private PersonManager personManager;

	public PersonControllerImpl() {
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
	public PersonDTO update(PersonDTO person) {
		return new PersonDTO(personManager.update(new Person(person.getId(), person.getName(), person.getSurname(), person.getBirthday(), person.getDeathday())));
	}

	@Required
	public void setPersonManager(PersonManager personManager) {
		this.personManager = personManager;
	}
}
