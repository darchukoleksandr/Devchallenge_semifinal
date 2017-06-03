using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Sqlite
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=Database.sqlite");
        }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Version> Versions { get; set; }
    }
}
