import multer from 'multer';
import { Post, UploadedFile, JsonController, Get, Param } from 'routing-controllers';
import { Service } from 'typedi';
import UploadService from '../services/upload.service';

@Service()
@JsonController('/uploadcsv')
export class UploadCsv {
  constructor(public uploadService: UploadService) {}

  @Post('/')
  public uploadCsv(
    @UploadedFile('file', { options: { storage: multer.memoryStorage() } }) file: Express.Multer.File
  ): Promise<object> {
    return this.uploadService.uploadCsv(file);
  }
  @Get('/:path')
  public uploadFromPath(@Param('path') path: string): Promise<object> {
    return this.uploadService.uploadFromPath(path);
  }
}
