import { Get, Controller } from 'routing-controllers';
import { Service } from 'typedi';
import VersionService from '../services/version.service';

@Service()
@Controller('/version')
export class VersionController {
  constructor(public versionService: VersionService) {}

  @Get('/')
  public getVersion(): string {
    return this.versionService.getVersion();
  }
}
