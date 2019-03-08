import { Provider } from '@nestjs/common';
import { ConnectionOptions } from './interfaces';
import * as Connection from 'express-cassandra';
export declare function createExpressCassandraProviders(
  entities?: Function[],
  connection?: Connection | ConnectionOptions | string,
): Provider[];
