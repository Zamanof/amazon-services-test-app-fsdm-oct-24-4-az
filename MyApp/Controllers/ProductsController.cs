using MyApp.Data;
using MyApp.DTOs;
using MyApp.Models;
using MyApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MyApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IStorageService _storageService;

    public ProductsController(AppDbContext context, IStorageService storageService)
    {
        _context = context;
        _storageService = storageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProducts()
    {
        var products = await _context.Products
                                     .OrderByDescending(p => p.CreatedAt)
                                     .Select(p => MapToReadDto(p))
                                     .ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductReadDto>> GetProductById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();
        return Ok(MapToReadDto(product));
    }

    [HttpPost]
    public async Task<ActionResult<ProductReadDto>> CreateProduct([FromForm] ProductCreateDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        ValidateDiscountRanges(productDto.DiscountStart, productDto.DiscountEnd);

        string? imageUrl = null;
        if (productDto.Image != null)
        {
            imageUrl = await _storageService.UploadFileAsync(productDto.Image);
        }

        var product = new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Category = productDto.Category,
            ImageUrl = imageUrl,
            CreatedAt = DateTime.UtcNow,
            DiscountStart = productDto.DiscountStart,
            DiscountEnd = productDto.DiscountEnd,
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, MapToReadDto(product));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProductReadDto>> UpdateProduct(int id, [FromForm] ProductUpdateDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        ValidateDiscountRanges(productDto.DiscountStart, productDto.DiscountEnd);

        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        product.Name = productDto.Name;
        product.Description = productDto.Description;
        product.Price = productDto.Price;
        product.Category = productDto.Category;
        product.DiscountStart = productDto.DiscountStart;
        product.DiscountEnd = productDto.DiscountEnd;

        if (productDto.Image != null)
        {
            if (!string.IsNullOrEmpty(product.ImageUrl))
            {
                try
                {
                    await _storageService.DeleteFileAsync(product.ImageUrl);
                }
                catch
                { }
            }
            product.ImageUrl = await _storageService.UploadFileAsync(productDto.Image);

        }
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return MapToReadDto(product);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        if (!string.IsNullOrEmpty(product.ImageUrl))
        {
            try
            {
                await _storageService.DeleteFileAsync(product.ImageUrl);
            }
            catch
            { }
        }
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static ProductReadDto MapToReadDto(Product p)
    {
        return new ProductReadDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Category = p.Category,
            ImageUrl = p.ImageUrl,
            CreatedAt = p.CreatedAt,
            DiscountStart = p.DiscountStart,
            DiscountEnd = p.DiscountEnd,
            IsDiscountActive = p.IsDiscountActive
        };
    }

    private void ValidateDiscountRanges(DateTime? discountStart, DateTime? discountEnd)
    {
        if (discountStart.HasValue && discountEnd.HasValue)
        {
            if (discountStart.Value >= discountEnd.Value)
            {
                ModelState.AddModelError("DiscountEnd", "Discount end date must be after the start date.");
            }
        }
        if (discountStart.HasValue != discountEnd.HasValue)
        {
            ModelState.AddModelError("DiscountDates", "Both discount start and end dates must be provided together.");
        }
    }
}
