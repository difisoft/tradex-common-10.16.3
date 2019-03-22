"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BulkError extends Error {
    constructor(bulkResult) {
        super();
        this.bulkResult = bulkResult;
    }
    getErrors() {
        return this.bulkResult.getWriteErrors();
    }
}
exports.BulkError = BulkError;
function forEachAggCursorPromise(cursor, callback) {
    return new Promise((resolve, reject) => {
        let process;
        const closeReject = (err) => {
            reject(err);
            cursor.close().then().catch();
        };
        process = () => {
            cursor.hasNext().then((has) => {
                if (has) {
                    cursor.next().then((data) => {
                        try {
                            callback(data).then((result) => {
                                if (result === false) {
                                    cursor.close().then(resolve).catch(reject);
                                }
                                else {
                                    process();
                                }
                            }).catch(closeReject);
                        }
                        catch (e) {
                            closeReject(e);
                            return;
                        }
                    }).catch(closeReject);
                }
                else {
                    cursor.close().then(resolve).catch(reject);
                }
            }).catch(closeReject);
        };
        process();
    });
}
exports.forEachAggCursorPromise = forEachAggCursorPromise;
function forEachAggCursor(cursor, callback) {
    return new Promise((resolve, reject) => {
        let process;
        const closeReject = (err) => {
            reject(err);
            cursor.close().then().catch();
        };
        process = () => {
            cursor.hasNext().then((has) => {
                if (has) {
                    cursor.next().then((data) => {
                        let result;
                        try {
                            result = callback(data);
                        }
                        catch (e) {
                            closeReject(e);
                            return;
                        }
                        if (result === false) {
                            cursor.close().then(resolve).catch(reject);
                        }
                        else {
                            process();
                        }
                    }).catch(closeReject);
                }
                else {
                    cursor.close().then(resolve).catch(reject);
                }
            }).catch(closeReject);
        };
        process();
    });
}
exports.forEachAggCursor = forEachAggCursor;
function mapAggCursor(cursor, transform) {
    return new Promise((resolve, reject) => {
        const results = [];
        let process;
        const closeReject = (err) => {
            reject(err);
            cursor.close().then().catch();
        };
        process = () => {
            cursor.hasNext().then((has) => {
                if (has) {
                    cursor.next().then((data) => {
                        try {
                            results.push(transform(data));
                        }
                        catch (e) {
                            closeReject(e);
                            return;
                        }
                        process();
                    }).catch(closeReject);
                }
                else {
                    cursor.close().then(() => resolve(results)).catch(reject);
                }
            }).catch(closeReject);
        };
        process();
    });
    return new Promise((resolve, reject) => {
        const results = [];
        cursor.each((error, result) => {
            if (error != null) {
                reject(error);
            }
            else {
                try {
                    results.push(transform(result));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    });
}
exports.mapAggCursor = mapAggCursor;
function handleBulkResult(result) {
    if (result.hasWriteErrors()) {
        throw new BulkError(result);
    }
}
exports.handleBulkResult = handleBulkResult;
//# sourceMappingURL=mongo.js.map