"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_utils_1 = require("../utils/decorator.utils");
function EntityMethod() {
    return (target, propertyKey, descriptor) => {
        let { methods } = decorator_utils_1.getOptions(target);
        methods = methods || {};
        methods[propertyKey] = descriptor.value;
        decorator_utils_1.addOptions(target, { methods });
        return descriptor;
    };
}
exports.EntityMethod = EntityMethod;
//# sourceMappingURL=entity-method.decorator.js.map