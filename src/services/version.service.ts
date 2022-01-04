import { Service } from 'typedi';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version: string = require('../../package.json').version;

@Service()
export default class VersionService {
  public getVersion(): string {
    return `${version} ${config.version}`;
  }
}
