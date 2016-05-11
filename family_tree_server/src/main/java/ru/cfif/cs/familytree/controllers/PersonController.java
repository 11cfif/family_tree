package ru.cfif.cs.familytree.controllers;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import ru.cfif.cs.familytree.controllers.dto.PersonDTO;

@Path("/person")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface PersonController {

	@GET
	@Path("/{familyId}")
	List<PersonDTO> loadAllByFamilyIndex(long familyId);

	@GET
	@Path("/{id}")
	PersonDTO load(@PathParam("id") long id);

	@POST
	PersonDTO save(PersonDTO person);

	@PUT
	PersonDTO update(PersonDTO person);

	@DELETE
	@Path("/{id}")
	void delete(@PathParam("id") long id);
}