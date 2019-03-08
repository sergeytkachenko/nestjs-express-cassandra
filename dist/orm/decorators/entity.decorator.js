"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_utils_1 = require("../utils/decorator.utils");
function Entity(nameOrOptions, maybeOptions) {
    const options = (typeof nameOrOptions === 'object'
        ? nameOrOptions
        : maybeOptions) || {};
    const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.table_name;
    return (target) => {
        options.instanceMethods = target.prototype;
        options.classMethods = target;
        decorator_utils_1.setEntityName(target.prototype, name);
        decorator_utils_1.addOptions(target.prototype, options);
    };
}
exports.Entity = Entity;
//# sourceMappingURL=entity.decorator.js.map