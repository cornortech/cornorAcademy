import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadBuffer = (buffer: Buffer, folder: string, filename: string) =>
  new Promise<any>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder, public_id: filename },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    upload.end(buffer);
  });
