package ru.cfif.cs.familytree.managers.impl;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import ru.cfif.cs.familytree.managers.PersonManager;
import ru.cfif.cs.familytree.model.Person;

public class InternalPersonManager implements PersonManager {

	private final Map<Long, Person> personMap = new HashMap<>();
	private static final AtomicLong COUNTER = new AtomicLong(1);

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
		Person personWithId = new Person(COUNTER.getAndIncrement(), person);
		personMap.put(personWithId.getId(), personWithId);
		return personWithId;
	}

	@Override
	public Person create(long familyId, Person person) {
		Person personWithId = new Person(COUNTER.getAndIncrement(), familyId,
			person.getName(), person.getSurname(), person.getBirthday(), person.getDeathday());
		personMap.put(personWithId.getId(), personWithId);
		return personWithId;
	}


	@Override
	public Person update(Person person) {
		Person newPerson = new Person(person.getId(), personMap.get(person.getId()).getFamilyId(), person.getName(),
			person.getSurname(), person.getBirthday(), person.getDeathday());
		personMap.put(person.getId(), newPerson);
		return newPerson;
	}

	@Override
	public void delete(long id) {
		personMap.remove(id);
	}
}
