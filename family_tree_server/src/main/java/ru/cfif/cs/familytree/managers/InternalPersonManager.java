package ru.cfif.cs.familytree.managers;

import java.util.*;

import ru.cfif.cs.familytree.model.Person;

public class InternalPersonManager implements PersonManager {

	private final Map<Long, Person> map = new HashMap<>();

	@Override
	public List<Person> loadAll() {
		return new ArrayList<>(map.values());
	}

	@Override
	public Optional<Person> load(long id) {
		return Optional.of(new Person("Alex", "Utkin", "11/12/13"));
//		return Optional.of(map.get(id));
	}

	@Override
	public List<Person> load(Iterable<Long> ids) {
		List<Person> res = new ArrayList<>();
		for (Long id : ids)
			res.add(map.get(id));
		return res;
	}

	@Override
	public Person create(Person person) {
		System.out.println("CREATE!!!! " + person);
		map.put(person.getId(), person);
		return person;
	}

	@Override
	public Person update(Person person) {
		return map.put(person.getId(), person);
	}

	@Override
	public void delete(long id) {
		map.remove(id);
	}
}
