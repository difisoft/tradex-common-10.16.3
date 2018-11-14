"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../modules/log");
exports.round = (input, scale = 2) => {
    if (input === undefined) {
        log_1.logger.error('Can not rounding undefined number');
        throw new Error('Can not rounding undefined number');
    }
    else {
        return Number(input.toFixed(scale));
    }
};
//# sourceMappingURL=MathUtils.js.map