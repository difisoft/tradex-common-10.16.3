"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_zookeeper_client_1 = require("node-zookeeper-client");
const logger_1 = require("../log/logger");
let zkClient = null;
let connected = false;
let cachedFunctions = [];
function zk(func) {
    if (connected) {
        func(zkClient);
    }
    else {
        cachedFunctions.push(func);
    }
}
function init(conf) {
    if (zkClient) {
        try {
            zkClient.close();
        }
        catch (e) {
        }
    }
    logger_1.logger.info(conf.zkUrls[0]);
    zkClient = node_zookeeper_client_1.createClient(conf.zkUrls[0]);
    connected = false;
    cachedFunctions = [];
    zkClient.once('connected', () => {
        logger_1.logger.info('connected to zk server');
        connected = true;
        cachedFunctions.forEach((func) => func(zkClient));
        cachedFunctions = [];
    });
    zkClient.on('disconnected', (e) => logger_1.logger.logError('disconnect', e));
    logger_1.logger.info('connecting...');
    zkClient.connect();
}
exports.default = {
    zk,
    init,
};
//# sourceMappingURL=index.js.map