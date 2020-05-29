using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Db
{
  public partial class Appointments
  {
    public int Id { get; set; }
    public int pet_id { get; set; }
    public DateTime appointmentDate { get; set; }
    public string appointmentSlot { get; set; }

    public virtual Pets Pet { get; private set; }
  }
}
