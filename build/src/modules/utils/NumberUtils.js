"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = (input, scale = 2) => {
    if (input === undefined) {
        throw new Error('Can not rounding undefined number');
    }
    else {
        return Number(input.toFixed(scale));
    }
};
//# sourceMappingURL=NumberUtils.js.map