
using Amazon.S3;
using Amazon.S3.Model;

namespace Amazon_Services_Test_App_FSDM_Oct_24_4_az.Services;

public class S3StorageService : IStorageService
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;
    private readonly string _region;

    public S3StorageService(IConfiguration configuration)
    {
        var awsSection = configuration.GetSection("AWS");
        var accessKey = awsSection["AccessKey"];
        var secretKey = awsSection["SecretKey"];
        _bucketName = awsSection["BucketName"]!;
        _region = awsSection["Region"]!;

        var credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);
        var config = new AmazonS3Config
        {
            RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(_region)
        };
        _s3Client = new AmazonS3Client(credentials, config);
    }

    public async Task<string> UploadFileAsync(IFormFile? file)
    {
        var fileExtension = Path.GetExtension(file!.FileName);
        var key = $"products/{Guid.NewGuid()}{fileExtension}";

        using var stream = file.OpenReadStream();

        var request = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = key,
            InputStream = stream,
            ContentType = file.ContentType
        };

        await _s3Client.PutObjectAsync(request);

        return $"https://{_bucketName}.s3.{_region}.amazonaws.com/{key}";
    }
    public async Task DeleteFileAsync(string fileUrl)
    {
        var url = new Uri(fileUrl);
        var key = url.AbsolutePath.TrimStart('/');

        var request = new DeleteObjectRequest
        {
            BucketName = _bucketName,
            Key = key
        };

        await _s3Client.DeleteObjectAsync(request);
    }

}
