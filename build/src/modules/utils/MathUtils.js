"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../modules/log");
exports.round = (input, scale = 2) => {
    if (input === undefined) {
        log_1.logger.warn('Warning rounding undefined number');
        return 0;
    }
    else {
        return Number(input.toFixed(scale));
    }
};
//# sourceMappingURL=MathUtils.js.map