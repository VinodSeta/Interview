using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Db
{
  public partial class Owners
  {
    public Owners()
    {
      this.Pets = new HashSet<Pets>();
    }
    public int Id { get; set; }
    public string first_name { get; set; }
    public string last_name { get; set; }

    [NotMapped]
    public string FullName
    {
      get
      {
        return $@"{first_name} {last_name}";
      }
    }

    public virtual ICollection<Pets> Pets { get; private set; }
  }
}

