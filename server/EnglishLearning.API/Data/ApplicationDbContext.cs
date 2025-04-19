using Microsoft.EntityFrameworkCore;

namespace EnglishLearning.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for your entities go here
        // public DbSet<YourEntity> YourEntities { get; set; }
    }
}