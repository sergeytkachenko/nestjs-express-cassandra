"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_constant_1 = require("../../orm.constant");
const decorator_utils_1 = require("../../utils/decorator.utils");
function BeforeDelete() {
    return (target, propertyKey, descriptor) => {
        const hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.BEFORE_DELETE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.BEFORE_DELETE, hookFuncLikeArray, target);
        const { before_delete } = decorator_utils_1.getOptions(target);
        if (!before_delete) {
            decorator_utils_1.addOptions(target, {
                before_save: decorator_utils_1.addHookFunction(target, orm_constant_1.BEFORE_DELETE),
            });
        }
        return descriptor;
    };
}
exports.BeforeDelete = BeforeDelete;
//# sourceMappingURL=before-dalete.decorator.js.map