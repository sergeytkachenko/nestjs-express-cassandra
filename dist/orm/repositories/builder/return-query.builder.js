"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnQueryBuilder {
    constructor(model) {
        this.model = model;
    }
    save(model, options = {}) {
        return new this.model(model).save(Object.assign({}, options, { return_query: true }));
    }
    update(query = {}, updateValue, options = {}) {
        return this.model.update(query, updateValue, Object.assign({}, options, { return_query: true }));
    }
    delete(query = {}, options = {}) {
        return this.model.delete(query, Object.assign({}, options, { return_query: true }));
    }
}
exports.ReturnQueryBuilder = ReturnQueryBuilder;
//# sourceMappingURL=return-query.builder.js.map