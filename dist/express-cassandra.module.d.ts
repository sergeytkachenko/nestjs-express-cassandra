import { DynamicModule } from '@nestjs/common';
import {
  ExpressCassandraModuleOptions,
  ExpressCassandraModuleAsyncOptions,
  ConnectionOptions,
} from './interfaces';
import * as Connection from 'express-cassandra';
export declare class ExpressCassandraModule {
  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule;
  static forFeature(
    entities?: Function[],
    connection?: Connection | ConnectionOptions | string,
  ): DynamicModule;
  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule;
}
