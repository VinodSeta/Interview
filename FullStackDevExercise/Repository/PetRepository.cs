using FullStackDevExercise.Db;
using FullStackDevExercise.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FullStackDevExercise.Repository
{
  public class PetRepository : GenericRepository<Pets>, IPetService
  {
    private readonly DoLittleDb _context;

    public PetRepository(DoLittleDb context) : base(context)
    {
      _context = context;
    }

  }
}
