using Microsoft.EntityFrameworkCore;


namespace FullStackDevExercise.Db
{
  public class DoLittleDb : DbContext
  {
    public DoLittleDb()
    {

    }
    public DoLittleDb(DbContextOptions<DoLittleDb> options)
          : base(options)
    {
    }

    //protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=./dolittle.db");

    public virtual DbSet<Owners> Owners { get; set; }
    public virtual DbSet<Pets> Pets { get; set; }
    public virtual DbSet<Appointments> Appointments { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Owners>().HasKey(e => e.Id);
      modelBuilder.Entity<Owners>().HasMany(p => p.Pets).WithOne(x => x.Owner).HasForeignKey(x => x.owner_id);

      modelBuilder.Entity<Pets>().HasKey(e => e.Id);
      modelBuilder.Entity<Pets>().HasOne(o => o.Owner);
      modelBuilder.Entity<Pets>().HasMany(a => a.Appointments).WithOne(s => s.Pet).HasForeignKey(x => x.pet_id);

      modelBuilder.Entity<Appointments>().HasKey(e => e.Id);
      modelBuilder.Entity<Appointments>().HasOne(b => b.Pet).WithMany(s => s.Appointments).HasForeignKey(x => x.pet_id);


      base.OnModelCreating(modelBuilder);
    }
  }
}
