package ru.cfif.cs.familytree.controllers;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import ru.cfif.cs.familytree.controllers.dto.*;

@Path("/family")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface FamilyController {

	@GET
	@Path("/{familyId}")
	FamilyDTO load(@PathParam("familyId") long id);

	@POST
	@Path("/{familyId}/child")
	void addChild(@PathParam("familyId") long familyId, ChildRelationDTO child);

	@POST
	@Path("/{familyId}/spouse")
	void addSpouse(@PathParam("familyId") long familyId, SpouseRelationDTO spouse);

	@DELETE
	@Path("/{familyId}/child")
	void removeChild(@PathParam("familyId") long familyId, @QueryParam("childId") long childId);

	@DELETE
	@Path("/{familyId}/spouse")
	void removeSpouse(@PathParam("familyId") long familyId, @QueryParam("spouseId") long spouseId);

	@GET
	List<FamilyInfoDTO> loadAllFamiliesInfo();

	@POST
	FamilyDTO createFamily(FamilyInfoDTO family);

	@PUT
	@Path("/{familyId}")
	FamilyInfoDTO updateFamily(@PathParam("familyId") long familyId, FamilyInfoDTO family);

	@DELETE
	@Path("/{familyId}")
	void delete(@PathParam("familyId") long familyId);
}
