"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const Connection = require("express-cassandra");
function handleRetry(retryAttempts = 6, retryDelay = 3000) {
    return (source) => source.pipe(operators_1.retryWhen(e => e.pipe(operators_1.scan((errorCount, error) => {
        common_1.Logger.error(`Unable to connect to the database. Retrying (${errorCount +
            1})...`, error.stack, 'ExpressCassandraModule');
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), operators_1.delay(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionToken(connection = 'default') {
    return 'default' === connection
        ? Connection
        : 'string' === typeof connection
            ? `${connection}Connection`
            : 'default' === connection.name || !connection.name
                ? Connection
                : `${connection.name}Connection`;
}
exports.getConnectionToken = getConnectionToken;
function getModelToken(entity) {
    return `${entity.name}Model`;
}
exports.getModelToken = getModelToken;
function getRepositoryToken(entity) {
    return `${entity.name}Repository`;
}
exports.getRepositoryToken = getRepositoryToken;
function getConnectionName(options) {
    return options && options.name ? options.name : 'default';
}
exports.getConnectionName = getConnectionName;
exports.generateString = () => [...Array(10)].map(i => ((Math.random() * 36) | 0).toString(36)).join;
//# sourceMappingURL=cassandra-orm.utils.js.map