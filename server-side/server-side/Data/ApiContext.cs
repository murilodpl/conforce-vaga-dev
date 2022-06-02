using Microsoft.EntityFrameworkCore;
using server_side.Models;

namespace server_side.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Ingrediente> Ingredientes { get; set; }
        public DbSet<Lanche> Lanches { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options)
            :base(options)
        {
        }
    }
}
