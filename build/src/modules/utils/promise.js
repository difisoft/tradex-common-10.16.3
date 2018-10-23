"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forEachWithPromise(array, itemProcess, stopCondition) {
    return new Promise((resolve, reject) => {
        let loop2 = null;
        const loop = (index) => {
            if (index >= array.length) {
                resolve(null);
            }
            if (stopCondition && stopCondition(index, array[index])) {
                resolve({ index: index });
                return;
            }
            itemProcess(array[index], index).then((e) => {
                if (stopCondition == null || !stopCondition(index, array[index], e)) {
                    loop2(index + 1);
                }
                else {
                    resolve({ index: index });
                }
            }).catch(reject);
        };
        loop2 = loop;
        loop(0);
    });
}
exports.forEachWithPromise = forEachWithPromise;
//# sourceMappingURL=promise.js.map