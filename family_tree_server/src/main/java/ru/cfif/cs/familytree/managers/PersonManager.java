package ru.cfif.cs.familytree.managers;

import java.util.List;
import java.util.Optional;

import ru.cfif.cs.familytree.model.Person;

public interface PersonManager {

	List<Person> loadAll();

	Optional<Person> load(long id);

	List<Person> load(Iterable<Long> ids);

	Person create(Person person);

	Person update(Person person);

	void delete(long id);
}
