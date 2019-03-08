"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cassandra_orm_utils_1 = require("./cassandra-orm.utils");
exports.InjectConnection = (connnection) => common_1.Inject(cassandra_orm_utils_1.getConnectionToken(connnection));
exports.InjectModel = (entity) => common_1.Inject(cassandra_orm_utils_1.getModelToken(entity));
exports.InjectRepository = (entity) => common_1.Inject(cassandra_orm_utils_1.getRepositoryToken(entity));
//# sourceMappingURL=express-cassandra.decorator.js.map