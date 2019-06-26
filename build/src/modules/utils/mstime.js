"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function diffMsTime(time) {
    const currentTime = process.hrtime();
    return currentTime[0] * 1000 + currentTime[1] / 1000000 - time;
}
exports.diffMsTime = diffMsTime;
//# sourceMappingURL=mstime.js.map