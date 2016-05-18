package ru.cfif.cs.familytree.controllers;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import ru.cfif.cs.familytree.controllers.dto.PersonDTO;

@Path("/person")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface PersonController {


	@GET
	@Path("/{id}")
	PersonDTO load(@PathParam("id") long id);

	@PUT
	@Path("/{id}")
	PersonDTO update(PersonDTO person);

}