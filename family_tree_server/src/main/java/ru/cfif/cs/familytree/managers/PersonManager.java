package ru.cfif.cs.familytree.managers;

import java.util.List;
import java.util.Optional;

import ru.cfif.cs.familytree.model.Person;

public interface PersonManager {

	List<Person> loadAllByFamilyIndex(long familyId);

	Optional<Person> load(long id);

	Person create(Person person);

	Person create(long familyId, Person person);

	Person update(Person person);

	void delete(long id);
}
