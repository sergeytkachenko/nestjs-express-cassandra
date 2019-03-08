"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const transform_entity_utils_1 = require("../utils/transform-entity.utils");
const defaultOptions = {
    findOptions: { raw: true },
    updateOptions: { if_exists: true },
    deleteOptions: { if_exists: true },
};
class Repository {
    create(entityLike) {
        return transform_entity_utils_1.transformEntity(this.target, entityLike);
    }
    findOne(query = {}, options = {}) {
        return rxjs_1.defer(() => this.model.findOneAsync(query, Object.assign({}, options, defaultOptions.findOptions))).pipe(operators_1.map(x => x && transform_entity_utils_1.transformEntity(this.target, x)));
    }
    find(query = {}, options = {}) {
        return rxjs_1.defer(() => this.model.findAsync(query, Object.assign({}, options, defaultOptions.findOptions))).pipe(operators_1.map(x => transform_entity_utils_1.transformEntity(this.target, x)));
    }
    findAndCount(query, options = {}) {
        return rxjs_1.defer(() => this.model.findAsync(query, Object.assign({}, options, defaultOptions.findOptions))).pipe(operators_1.map(x => transform_entity_utils_1.transformEntity(this.target, x)), operators_1.map(entities => [entities, entities.length]));
    }
    save(entity, options = {}) {
        const model = new this.model(entity);
        return rxjs_1.defer(() => model.saveAsync(options)).pipe(operators_1.map(() => transform_entity_utils_1.transformEntity(this.target, model.toJSON())));
    }
    update(query = {}, updateValue, options = {}) {
        return rxjs_1.defer(() => this.model.updateAsync(query, updateValue, Object.assign({}, defaultOptions.updateOptions, options)));
    }
    delete(query = {}, options = {}) {
        return rxjs_1.defer(() => this.model.deleteAsync(query, options));
    }
    truncate() {
        return rxjs_1.defer(() => this.model.truncateAsync());
    }
    stream(query, options = {}) {
        const reader$ = new rxjs_1.Subject();
        const onRead = (reader) => {
            while (true) {
                const row = reader.readRow();
                if (row === null) {
                    break;
                }
                reader$.next(transform_entity_utils_1.transformEntity(this.target, row));
            }
        };
        const onDone = (error) => {
            if (error) {
                reader$.error(error);
            }
            reader$.complete();
            return;
        };
        this.model.stream(query, Object.assign({}, options, defaultOptions.findOptions), onRead, onDone);
        return reader$.asObservable();
    }
    eachRow(query, options = {}) {
        const reader$ = new rxjs_1.Subject();
        const done$ = new rxjs_1.Subject();
        const getReader = () => reader$.asObservable();
        const getDone = () => done$.asObservable();
        const onRow = (n, row) => reader$.next(transform_entity_utils_1.transformEntity(this.target, row));
        const onDone = (err, result) => {
            if (err) {
                reader$.error(err);
                done$.error(err);
            }
            else {
                done$.next(result);
            }
            reader$.complete();
            done$.complete();
        };
        this.model.eachRow(query, Object.assign({}, options, defaultOptions.findOptions), onRow, onDone);
        return { getReader, getDone };
    }
    get getModelRef() {
        return this.model;
    }
    getReturnQueryBuilder() {
        return this.returnQueryBuilder;
    }
    doBatch(queries) {
        return this.model.execute_batchAsync(queries);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map