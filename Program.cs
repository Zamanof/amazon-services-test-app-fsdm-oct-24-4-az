using Amazon_Services_Test_App_FSDM_Oct_24_4_az.Data;
using Amazon_Services_Test_App_FSDM_Oct_24_4_az.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IStorageService, S3StorageService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactApp");
app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
