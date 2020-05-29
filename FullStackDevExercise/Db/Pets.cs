using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Db
{
  public partial class Pets
  {
    public Pets()
    {
      this.Appointments = new HashSet<Appointments>();
    }
    public int Id { get; set; }
    public int owner_id { get; set; }
    public string type { get; set; }
    public string name { get; set; }
    public int age { get; set; }

    public virtual Owners Owner { get; private set; }
    public virtual ICollection<Appointments> Appointments { get; private set; }

  }
}
