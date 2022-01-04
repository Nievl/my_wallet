import { BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
export default class HealthCheckService {
  private static liveness = 'loaded';

  public liveness() {
    if (HealthCheckService.liveness !== 'loaded') {
      throw new BadRequestError(HealthCheckService.liveness);
    }

    return HealthCheckService.liveness;
  }

  public setLiveness(liveness: string) {
    HealthCheckService.liveness = liveness;
  }
}
