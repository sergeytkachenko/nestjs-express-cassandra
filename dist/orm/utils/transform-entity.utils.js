"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformEntity(target, entityLike) {
    if (!target || !(target && typeof target === 'function') || !entityLike) {
        return entityLike;
    }
    if (entityLike instanceof Array) {
        return entityLike.map(entity => Object.assign(new target(), entity));
    }
    return Object.assign(new target(), entityLike);
}
exports.transformEntity = transformEntity;
//# sourceMappingURL=transform-entity.utils.js.map