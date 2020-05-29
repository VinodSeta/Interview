using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using FullStackDevExercise.Db;
using FullStackDevExercise.Helper;
using FullStackDevExercise.Interface;
using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;

namespace FullStackDevExercise.Controllers
{
  [Produces("application/json")]
  [Route("api/Appointments")]
  [ApiController]
  public class AppointmentsController : ControllerBase
  {
    private readonly JsonResponse _jsonResponse;
    private readonly IPetService _pet;
    private readonly IOwnerService _owner;
    private readonly IAppointmentService _appointment;

    public AppointmentsController(IPetService pet, IOwnerService owner, IAppointmentService appointment)
    {
      _jsonResponse = new JsonResponse();
      _pet = pet;
      _owner = owner;
      _appointment = appointment;
    }

    // GET: api/Pets
    [Route("GetAppointmentsList")]
    [HttpGet]
    public IActionResult GetAppointmentsList()
    {
      try
      {
        var result = _appointment.GetAll(x => x.Id != 0, false, x => x.Pet, x => x.Pet.Owner).Select(x => new
        {
          x.Id,
          x.Pet.type,
          x.Pet.name,
          owner = x.Pet.Owner.FullName,
          date = x.appointmentDate,
          slot = x.appointmentSlot
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

    // GET: api/Owners
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

    // GET: api/Pets
    [Route("GetPetsList")]
    [HttpGet]
    public IActionResult GetPetsList([FromQuery]int id)
    {
      try
      {
        var result = _pet.GetAll(x => x.owner_id == id).Select(x => new DropdownDataModel
        {
          Value = x.Id,
          Text = x.name,
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
    [Route("GetTimeSlotList")]
    [HttpGet]
    public IActionResult GetTimeSlotList()
    {
      try
      {
        var SlotList = new List<DropdownDataModel>();
        DateTime start = new DateTime(2020, 5, 1, 9, 00, 00);
        DateTime end = new DateTime(2020, 5, 1, 18, 00, 00);
        double duration = 30;
        while (true)
        {
          DateTime dtNext = start.AddMinutes(duration);
          if (start > end || dtNext > end)
            break;
          if (start < DateTime.Parse("12:00 PM"))
          {
            SlotList.Add(new DropdownDataModel { Text = $@"{start.ToShortTimeString()} - {dtNext.ToShortTimeString()}" });
          }
          else
          {
            SlotList.Add(new DropdownDataModel { Text = $@"{start.ToShortTimeString()} - {dtNext.ToShortTimeString()}" });
          }
          start = dtNext;
        }

        return _jsonResponse.GenerateJsonResult(1, "Get List Successfully", new DatatableResponseHelper
        {
          Data = SlotList
        });

      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0);
      }
    }

    [Route("IsAppointmentBook")]
    [HttpGet]
    public IActionResult IsAppointmentBook([FromQuery]int petId, string slot)
    {
      try
      {
        var isBook = _appointment.GetSingle(x => x.pet_id == petId && x.appointmentSlot.Equals(slot));
        return _jsonResponse.GenerateJsonResult(1, "Get List Successfully", new DatatableResponseHelper
        {
          Data = isBook != null
        });

      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0);
      }
    }

    [HttpPost]
    [Route("AddEditAppointment")]
    public IActionResult AddEditAppointment([FromBody]Appointments model)
    {
      try
      {

        if (model.Id == 0)
        {
          var isBook = _appointment.GetSingle(x => x.pet_id == model.pet_id && x.appointmentDate.Date == model.appointmentDate.Date && x.appointmentSlot.Equals(model.appointmentSlot));
          if (isBook != null)
            return _jsonResponse.GenerateJsonResult(0, "Appointment is already book");
          _appointment.Add(model);
          _appointment.Save();
          return _jsonResponse.GenerateJsonResult(1, "Appointment save Successfully");
        }
        else
        {
          var isBook = _appointment.GetSingle(x => x.Id != model.Id && x.pet_id == model.pet_id && x.appointmentDate.Date == model.appointmentDate.Date && x.appointmentSlot.Equals(model.appointmentSlot));
          if (isBook != null)
            return _jsonResponse.GenerateJsonResult(0, "Appointment is already book");
          var edit = _appointment.GetSingle(x => x.Id == model.Id);
          edit.pet_id = model.pet_id;
          edit.appointmentDate = model.appointmentDate;
          edit.appointmentSlot = model.appointmentSlot;
          _appointment.Update(edit);
          _appointment.Save();
          return _jsonResponse.GenerateJsonResult(1, "Appointment update Successfully");
        }
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }

    // DELETE: api/DeleteOwner/5
    [Route("DeleteAppointment")]
    [HttpGet]
    public IActionResult DeleteAppointment([FromQuery]int id)
    {
      try
      {
        var owner = _appointment.GetSingle(x => x.Id == id);
        if (owner == null)
          return _jsonResponse.GenerateJsonResult(0, "Appointment is Detail Not Found");

        _appointment.Delete(owner);
        _appointment.Save();

        return _jsonResponse.GenerateJsonResult(1, $@"Appointment is Deleted");
      }
      catch (Exception ex)
      {
        return _jsonResponse.GenerateJsonResult(0, "UnhandledError");
      }
    }
  }
}
