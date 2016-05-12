package ru.cfif.cs.familytree.managers.impl;

import java.util.*;
import java.util.stream.Collectors;

import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.Person;

public class InternalPersonManager implements PersonManager {

	private final Map<Long, Person> personMap = new HashMap<>();

	@Override
	public List<Person> loadAllByFamilyIndex(long familyId) {
		return personMap.values()
			.stream()
			.filter(person -> person.getFamilyId() == familyId)
			.collect(Collectors.toList());
	}

	@Override
	public Optional<Person> load(long id) {
		return Optional.of(personMap.get(id));
	}

	@Override
	public Person create(Person person) {
		System.out.println("CREATE!!!! " + person);
		personMap.put(person.getId(), person);
		return person;
	}

	@Override
	public Person update(Person person) {
		return personMap.put(person.getId(), person);
	}

	@Override
	public void delete(long id) {
		personMap.remove(id);
	}
}
