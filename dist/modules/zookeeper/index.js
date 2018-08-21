'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.zk = undefined;

var _nodeZookeeperClient = require('node-zookeeper-client');

var _logger = require('../log/logger');

var zkClient = null;
var connected = false;
var cachedFunctions = [];

/**
 * @param func {Function}
 */
function zk(func) {
  if (connected) {
    func(zkClient);
  } else {
    cachedFunctions.push(func);
  }
}

function init(conf) {
  if (zkClient) {
    try {
      zkClient.close();
    } catch (e) {
      // do nothing
    }
  }
  console.info(conf.zkUrls[0]);
  zkClient = (0, _nodeZookeeperClient.createClient)(conf.zkUrls[0]);
  connected = false;
  cachedFunctions = [];
  zkClient.once('connected', function () {
    _logger.logger.info('connected to zk server');
    connected = true;
    cachedFunctions.forEach(function (func) {
      return func(zkClient);
    });
    cachedFunctions = [];
  });
  zkClient.on('disconnected', function (e) {
    return (0, _logger.logError)('disconnect', e);
  });
  console.info('connecting...');
  zkClient.connect();
}

exports.zk = zk;
exports.init = init;