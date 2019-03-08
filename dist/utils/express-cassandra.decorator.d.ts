import * as Connection from 'express-cassandra';
import { ConnectionOptions } from '../interfaces';
export declare const InjectConnection: (
  connnection?: Connection | ConnectionOptions | string,
) => ParameterDecorator;
export declare const InjectModel: (
  entity: Function,
) => (target: Object, key: string | symbol, index?: number) => void;
export declare const InjectRepository: (
  entity: Function,
) => (target: Object, key: string | symbol, index?: number) => void;
