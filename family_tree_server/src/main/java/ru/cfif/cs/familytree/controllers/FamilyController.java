package ru.cfif.cs.familytree.controllers;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import ru.cfif.cs.familytree.controllers.dto.FamilyDTO;
import ru.cfif.cs.familytree.controllers.dto.FamilyInfoDTO;

@Path("/family")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface FamilyController {

	@GET
	@Path("/{id}")
	FamilyDTO load(@PathParam("id") long id);

	@POST
	@Path("/add/child")
	void addChild(@QueryParam("parentId") long parentId, @QueryParam("childId") long childId);

	@POST
	@Path("/add/spouse")
	void addSpouse(@QueryParam("parentId") long mainId, @QueryParam("childId") long secondaryId);

	@DELETE
	@Path("/add/child")
	void removeChild(@QueryParam("parentId") long parentId, @QueryParam("childId") long childId);

	@DELETE
	@Path("/add/spouse")
	void removeSpouse(@QueryParam("parentId") long mainId, @QueryParam("childId") long secondaryId);

	@GET
	List<FamilyInfoDTO> loadAllFamiliesInfo();

	@POST
	FamilyDTO createFamily(FamilyInfoDTO family);

	@PUT
	@Path("/{id}")
	FamilyDTO updateFamilyInfo(FamilyDTO family);

	@DELETE
	@Path("/{id}")
	void delete(@PathParam("id") long id);
}
