using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Electronic", new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Utc), "Latest Apple smartphone with A17 Pro chip", null, "iPhone 15 Pro", 1299.99m },
                    { 2, "Furniture", new DateTime(2024, 3, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Ergonomic gaming chair with lumbar support", null, "Gaming Chair", 349.50m },
                    { 3, "Books", new DateTime(2024, 1, 20, 0, 0, 0, 0, DateTimeKind.Utc), "Comprehensive guide for learning C# and .NET", null, "C# Programming Book", 45.99m },
                    { 4, "Sports", new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Utc), "Comfortable sport shoes for daily running", null, "Running Shoes", 89.99m },
                    { 5, "Home Appliance", new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Automatic coffee machine for home use", null, "Coffee Maker", 159.75m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
