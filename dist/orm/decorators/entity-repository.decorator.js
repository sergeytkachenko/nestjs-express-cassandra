"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_utils_1 = require("../utils/decorator.utils");
function EntityRepository(entity) {
    return (target) => {
        decorator_utils_1.setEntity(target, entity);
    };
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity-repository.decorator.js.map