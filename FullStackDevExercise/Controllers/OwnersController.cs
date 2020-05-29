using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using FullStackDevExercise.Db;
using FullStackDevExercise.Helper;
using FullStackDevExercise.Interface;

namespace FullStackDevExercise.Controllers
{
  [Produces("application/json")]
  [Route("api/Owners")]
  [ApiController]
  public class OwnersController : ControllerBase
  {
    private readonly JsonResponse _jsonResponse;
    private readonly IOwnerService _owner;

    public OwnersController(IOwnerService owner)
    {
      _jsonResponse = new JsonResponse();
      _owner = owner;
    }

    // GET: api/Owners
    [Route("GetOwnersList")]
    [HttpGet]
    public IActionResult GetOwnersList()
    {
      try
      {
        var result = _owner.GetAll().ToList();
        return _jsonResponse.GenerateJsonResult(1, "Get List Successfully", new DatatableResponseHelper
        {
          TotalElements = result.Count,
          Data = result
        });

      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0);
      }
    }

    [HttpPost]
    [Route("AddEditOwner")]
    public IActionResult AddEditOwner([FromBody]Owners model)
    {
      try
      {
        if (model.Id == 0)
        {
          _owner.Add(model);
          _owner.Save();
          return _jsonResponse.GenerateJsonResult(1, "Owner save Successfully");
        }
        var edit = _owner.GetSingle(x => x.Id == model.Id);
        edit.first_name = model.first_name;
        edit.last_name = model.last_name;
        _owner.Update(edit);
        _owner.Save();
        return _jsonResponse.GenerateJsonResult(1, "Owner update Successfully");
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }

    // DELETE: api/DeleteOwner/5
    [Route("DeleteOwner")]
    [HttpGet]
    public IActionResult DeleteOwner([FromQuery]int id)
    {
      try
      {
        var owner = _owner.GetSingle(x => x.Id == id);
        if (owner == null)
          return _jsonResponse.GenerateJsonResult(0, "Owner is Detail Not Found");

        _owner.Delete(owner);
        _owner.Save();

        return _jsonResponse.GenerateJsonResult(1, $@"Owner is Deleted");
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }
  }
}
