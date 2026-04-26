using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class Discount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DiscountEnd",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DiscountStart",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDiscountActive",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DiscountEnd", "DiscountStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DiscountEnd", "DiscountStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "DiscountEnd", "DiscountStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "DiscountEnd", "DiscountStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "DiscountEnd", "DiscountStart" },
                values: new object[] { null, null });

            migrationBuilder.CreateIndex(
                name: "Products_IsDiscountActive_DiscountStart_DiscountEnd",
                table: "Products",
                columns: new[] { "IsDiscountActive", "DiscountStart", "DiscountEnd" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Products_IsDiscountActive_DiscountStart_DiscountEnd",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DiscountEnd",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DiscountStart",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsDiscountActive",
                table: "Products");
        }
    }
}
