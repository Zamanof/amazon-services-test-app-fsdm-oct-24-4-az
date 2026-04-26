namespace MyApp.Services;

public interface IStorageService
{
    Task<string> UploadFileAsync(IFormFile? file);
    Task DeleteFileAsync(string fileUrl);

}
