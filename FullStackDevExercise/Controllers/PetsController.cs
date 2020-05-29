using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using FullStackDevExercise.Db;
using FullStackDevExercise.Helper;
using FullStackDevExercise.Interface;

namespace FullStackDevExercise.Controllers
{
  [Produces("application/json")]
  [Route("api/Pets")]
  [ApiController]
  public class PetsController : ControllerBase
  {
    private readonly JsonResponse _jsonResponse;
    private readonly IPetService _pet;
    private readonly IOwnerService _owner;

    public PetsController(IPetService pet, IOwnerService owner)
    {
      _jsonResponse = new JsonResponse();
      _pet = pet;
      _owner = owner;
    }

    // GET: api/Pets
    [Route("GetPetsList")]
    [HttpGet]
    public IActionResult GetPetsList()
    {
      try
      {
        var result = _pet.GetAll(x => x.Id != 0, false, x => x.Owner).Select(x => new
        {
          x.Id,
          x.owner_id,
          owner = x.Owner.FullName ?? "",
          x.type,
          x.name,
          x.age
        }).ToList();
        return _jsonResponse.GenerateJsonResult(1, "Get List Successfully", new DatatableResponseHelper
        {
          Data = result
        });

      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0);
      }
    }

    // GET: api/Pets
    [Route("GetOwnersList")]
    [HttpGet]
    public IActionResult GetOwnersList()
    {
      try
      {
        var result = _owner.GetAll().Select(x => new DropdownDataModel
        {
          Value = x.Id,
          Text = x.FullName
        }).ToList();
        return _jsonResponse.GenerateJsonResult(1, "Get List Successfully", new DatatableResponseHelper
        {
          Data = result
        });

      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0);
      }
    }

    [HttpPost]
    [Route("AddEditPet")]
    public IActionResult AddEditPet([FromBody]Pets model)
    {
      try
      {
        if (model.Id == 0)
        {
          _pet.Add(model);
          _pet.Save();
          return _jsonResponse.GenerateJsonResult(1, "Owner save Successfully");
        }
        var edit = _pet.GetSingle(x => x.Id == model.Id);
        edit.owner_id = model.owner_id;
        edit.type = model.type;
        edit.name = model.name;
        edit.age = model.age;
        _pet.Update(edit);
        _pet.Save();
        return _jsonResponse.GenerateJsonResult(1, "Owner update Successfully");
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }

    // DELETE: api/DeleteOwner/5
    [Route("DeletePet")]
    [HttpGet]
    public IActionResult DeletePet([FromQuery]int id)
    {
      try
      {
        var owner = _pet.GetSingle(x => x.Id == id);
        if (owner == null)
          return _jsonResponse.GenerateJsonResult(0, "Owner is Detail Not Found");

        _pet.Delete(owner);
        _pet.Save();

        return _jsonResponse.GenerateJsonResult(1, $@"Owner is Deleted");
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }
  }
}
