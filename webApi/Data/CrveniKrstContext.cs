using Microsoft.EntityFrameworkCore;
using webApi.Models;

namespace webApi.Data
{
    public class CrveniKrstContext : DbContext
    {
        public CrveniKrstContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Grad> Gradovi { get; set; }
        public DbSet<Tim> Timovi { get; set; }
        public DbSet<Volonter> Volonteri { get; set; }
    }
}