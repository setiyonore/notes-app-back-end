const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class StorageService {
  constructor() {
    this._s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async writeFile(file, meta) {
    try {
      const parameter = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: meta.filename,
        Body: file._data,
        ContentType: meta.headers['content-type'],
      });
      const data = await this._s3.send(parameter);
      console.log(data); // Check if the file is uploaded successfully
      const url = this.createPreSignedUrl({
        bucket: process.env.AWS_BUCKET_NAME,
        Key: meta.filename,
      });
      return url;
    } catch (error) {
      console.error(error); // Catch and log any errors
      return null;
    }
  }

  createPreSignedUrl({ bucket, key }) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    return getSignedUrl(this._s3, command, { expiresIn: 3600 });
  }
}

module.exports = StorageService;
