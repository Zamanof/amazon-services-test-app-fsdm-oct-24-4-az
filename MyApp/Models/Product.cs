using System.ComponentModel.DataAnnotations;

namespace MyApp.Models;

public class Product
{
    public int Id { get; set; }
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(2000)]
    public string? Description { get; set; }
    [Range(0.01, 999999.99)]
    public decimal Price { get; set; }
    [MaxLength(100)]
    public string? Category { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DiscountStart { get; set; }
    public DateTime? DiscountEnd { get; set; }
    public bool IsDiscountActive { get; set; }
}
