using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Hosting;

namespace FullStackDevExercise
{
  public class Program
  {
    public static void Main(string[] args)
    {
      BootstrapData();
      CreateHostBuilder(args).Build().Run();
    }

    private static void BootstrapData()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder
      {
        DataSource = "./dolittle.db"
      };

      using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
      connection.Open();
      SetupDB(connection);
      CreateOwnersTable(connection);
      CreatePetsTable(connection);
      CreateAppointmentsTable(connection);
    }

    private static void SetupDB(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"  PRAGMA foreign_keys = ON;";
    }

    private static void CreateOwnersTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS owners
        (
          id INTEGER PRIMARY KEY
          , first_name VARCHAR(50) NOT NULL
          , last_name VARCHAR(50) NOT NULL
        )
      ";
      createTable.ExecuteNonQuery();
    }

    private static void CreatePetsTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS pets
        (
          id INTEGER PRIMARY KEY
          , owner_id INT NOT NULL
          , type VARCHAR(50) NOT NULL
          , name VARCHAR(50) NOT NULL
          , age INT NOT NULL
          , FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE ON UPDATE NO ACTION 
        )
      ";
      createTable.ExecuteNonQuery();
    }

    private static void CreateAppointmentsTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS appointments
        (
          id INTEGER PRIMARY KEY
          , pet_id INT NOT NULL
          , appointmentDate datetime NOT NULL
          , appointmentSlot VARCHAR(50) NOT NULL
          , FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE ON UPDATE NO ACTION 
        )
      ";
      createTable.ExecuteNonQuery();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
