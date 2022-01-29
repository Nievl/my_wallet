import multer from 'multer';
import { Post, UploadedFile, JsonController, Get, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { uploadOptions } from '../../web/dto/Transaction';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import ServiceException from '../models/exceptions/serviceException';

@Service()
@JsonController('/uploadcsv')
export class UploadCsv {
  /**
   * @deprecated
   */
  @Post('/')
  public uploadCsv(
    @UploadedFile('file', { options: { storage: multer.memoryStorage() } }) file: Express.Multer.File,
    @QueryParam('option')
    option: uploadOptions
  ): Promise<object> {
    throw new ServiceException(ExceptionTypes.BadRequest, `upload csv is deprecated`);
  }
  /**
   * @deprecated
   */
  @Get('/:path')
  public uploadFromPath(@Param('path') path: string): Promise<object> {
    throw new ServiceException(ExceptionTypes.BadRequest, `upload csv is deprecated`);
  }
}
