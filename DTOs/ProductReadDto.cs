namespace Amazon_Services_Test_App_FSDM_Oct_24_4_az.DTOs;

public class ProductReadDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? Category { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreateAt { get; set; }
}
