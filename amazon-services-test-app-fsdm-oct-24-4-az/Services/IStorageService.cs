namespace Amazon_Services_Test_App_FSDM_Oct_24_4_az.Services;

public interface IStorageService
{
    Task<string> UploadFileAsync(IFormFile? file);
    Task DeleteFileAsync(string fileUrl);

}
