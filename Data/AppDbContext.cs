using Amazon_Services_Test_App_FSDM_Oct_24_4_az.Models;
using Microsoft.EntityFrameworkCore;

namespace Amazon_Services_Test_App_FSDM_Oct_24_4_az.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options)
    {
    }
    public DbSet<Product> Products { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Price).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<Product>().HasData(
    new Product
    {
        Id = 1,
        Name = "iPhone 15 Pro",
        Description = "Latest Apple smartphone with A17 Pro chip",
        Price = 1299.99m,
        Category = "Electronic",
        ImageUrl = null,
        CreatedAt = new DateTime(2024, 2, 15, 0, 0, 0, DateTimeKind.Utc),
    },

    new Product
    {
        Id = 2,
        Name = "Gaming Chair",
        Description = "Ergonomic gaming chair with lumbar support",
        Price = 349.50m,
        Category = "Furniture",
        ImageUrl = null,
        CreatedAt = new DateTime(2024, 3, 10, 0, 0, 0, DateTimeKind.Utc),
    },

    new Product
    {
        Id = 3,
        Name = "C# Programming Book",
        Description = "Comprehensive guide for learning C# and .NET",
        Price = 45.99m,
        Category = "Books",
        ImageUrl = null,
        CreatedAt = new DateTime(2024, 1, 20, 0, 0, 0, DateTimeKind.Utc),
    },

    new Product
    {
        Id = 4,
        Name = "Running Shoes",
        Description = "Comfortable sport shoes for daily running",
        Price = 89.99m,
        Category = "Sports",
        ImageUrl = null,
        CreatedAt = new DateTime(2024, 4, 5, 0, 0, 0, DateTimeKind.Utc),
    },

    new Product
    {
        Id = 5,
        Name = "Coffee Maker",
        Description = "Automatic coffee machine for home use",
        Price = 159.75m,
        Category = "Home Appliance",
        ImageUrl = null,
        CreatedAt = new DateTime(2024, 5, 1, 0, 0, 0, DateTimeKind.Utc),
    }
);
    }
}
