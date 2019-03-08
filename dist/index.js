"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const cassandra_driver_1 = require("cassandra-driver");
__export(require("cassandra-driver"));
__export(require("./express-cassandra.module"));
__export(require("./utils/express-cassandra.decorator"));
__export(require("./orm"));
exports.uuid = (id) => {
    if (!id) {
        return cassandra_driver_1.types.Uuid.random();
    }
    if (typeof id === 'string') {
        return cassandra_driver_1.types.Uuid.fromString(id);
    }
    return id;
};
exports.isUuid = (id) => id && id instanceof cassandra_driver_1.types.Uuid;
exports.timeuuid = (idOrDate) => {
    if (!idOrDate) {
        return new cassandra_driver_1.types.TimeUuid();
    }
    if (typeof idOrDate === 'string') {
        return cassandra_driver_1.types.TimeUuid.fromString(idOrDate);
    }
    if (idOrDate instanceof Date) {
        return cassandra_driver_1.types.TimeUuid.fromDate(idOrDate);
    }
    return idOrDate;
};
exports.isTimeUuid = (id) => id && id instanceof cassandra_driver_1.types.TimeUuid;
//# sourceMappingURL=index.js.map