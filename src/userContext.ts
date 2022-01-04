import { Service } from 'typedi';

@Service()
export class UserContext {
  public requestId: string;
  public token: string;
  public originalUrl: string;
  public method: string;
}
