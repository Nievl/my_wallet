import multer from 'multer';
import { Post, UploadedFile, JsonController, Get, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { uploadOptions } from '../../web/dto/Transaction';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import ServiceException from '../models/exceptions/serviceException';
import UploadService from '../services/upload.service';

@Service()
@JsonController('/uploadcsv')
export class UploadCsv {
  constructor(public uploadService: UploadService) {}

  @Post('/')
  public uploadCsv(
    @UploadedFile('file', { options: { storage: multer.memoryStorage() } }) file: Express.Multer.File,
    @QueryParam('option')
    option: uploadOptions
  ): Promise<object> {
    if (option === 'doubles') {
      return this.uploadService.uploadCsvAndFindDoubles(file);
    } else if (option === 'base') {
      return this.uploadService.uploadCsv(file);
    } else if (option === 'save') {
      return this.uploadService.UploadAndSaveOnDisk(file);
    } else {
      throw new ServiceException(ExceptionTypes.BadRequest, `option param is not defined`);
    }
  }
  @Get('/:path')
  public uploadFromPath(@Param('path') path: string): Promise<object> {
    return this.uploadService.uploadFromPath(path);
  }
}
