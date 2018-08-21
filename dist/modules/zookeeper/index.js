"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zk;

var _nodeZookeeperClient = require("node-zookeeper-client");

var _conf = require("../../conf");

var _conf2 = _interopRequireDefault(_conf);

var _logger = require("../log/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
init();
console.info('connecting...');
zkClient.connect();

function init() {
  if (zkClient) {
    try {
      zkClient.close();
    } catch (e) {
      // do nothing
    }
  }
  console.info(_conf2.default.zkUrls[0]);
  zkClient = (0, _nodeZookeeperClient.createClient)(_conf2.default.zkUrls[0]);
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
}