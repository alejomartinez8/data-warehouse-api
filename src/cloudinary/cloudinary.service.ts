import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) reject(error);
        resolve(result);
      });

      Readable.from(file.buffer).pipe(upload);
    });
  }

  destroyImage(
    id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.destroy(id);
  }
}
