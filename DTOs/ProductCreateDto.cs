using System.ComponentModel.DataAnnotations;

namespace Amazon_Services_Test_App_FSDM_Oct_24_4_az.DTOs;

public class ProductCreateDto
{
    [Required(ErrorMessage ="Product name is required")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(2000)]
    public string? Description { get; set; }
    [Required(ErrorMessage = "Product price is required")]
    [Range(0.01, 999999.99)]
    public decimal Price { get; set; }
    [MaxLength(100)]
    public string? Category { get; set; }
    public IFormFile? Image { get; set; }
}
