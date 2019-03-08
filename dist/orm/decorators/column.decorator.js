"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_utils_1 = require("../utils/decorator.utils");
const listeners_1 = require("./listeners");
const __1 = require("../../");
function Column(options) {
    return (target, propertyName) => {
        decorator_utils_1.addAttribute(target, propertyName, options);
    };
}
exports.Column = Column;
function GeneratedUUidColumn(type = 'uuid') {
    return (target, propertyName) => {
        const fn = {
            value: (...args) => {
                const instance = args[0];
                if (instance !== null && !instance[propertyName]) {
                    instance[propertyName] = type === 'timeuuid' ? __1.timeuuid() : __1.uuid();
                }
            },
        };
        Column({
            type,
            default: { $db_function: type === 'timeuuid' ? 'now()' : 'uuid()' },
        })(target, propertyName);
        listeners_1.BeforeSave()(target, propertyName, fn);
    };
}
exports.GeneratedUUidColumn = GeneratedUUidColumn;
function VersionColumn() {
    return (target, propertyName) => {
        decorator_utils_1.addOptions(target, { options: { versions: { key: propertyName } } });
    };
}
exports.VersionColumn = VersionColumn;
function CreateDateColumn() {
    return (target, propertyName) => {
        decorator_utils_1.addOptions(target, {
            options: { timestamps: { createdAt: propertyName } },
        });
    };
}
exports.CreateDateColumn = CreateDateColumn;
function UpdateDateColumn() {
    return (target, propertyName) => {
        decorator_utils_1.addOptions(target, {
            options: { timestamps: { updatedAt: propertyName } },
        });
    };
}
exports.UpdateDateColumn = UpdateDateColumn;
function IndexColumn() {
    return (target, propertyName) => {
        let { indexes } = decorator_utils_1.getOptions(target);
        indexes = indexes || [];
        const isAdded = indexes.some(value => value === propertyName);
        if (isAdded) {
            return;
        }
        indexes.push(propertyName);
        decorator_utils_1.addOptions(target, { indexes });
    };
}
exports.IndexColumn = IndexColumn;
//# sourceMappingURL=column.decorator.js.map