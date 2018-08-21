'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeRdkafka = require('node-rdkafka');

var _nodeRdkafka2 = _interopRequireDefault(_nodeRdkafka);

var _logger = require('./../log/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StreamHandler = function StreamHandler(conf, options, topics, dataHandler) {
  var _this = this;

  _classCallCheck(this, StreamHandler);

  var ops = Object.assign({
    'group.id': conf.clusterId,
    'metadata.broker.list': conf.kafkaUrls.join()
  }, options);
  this.hasError = false;
  this.stream = _nodeRdkafka2.default.KafkaConsumer.createReadStream(ops, {}, {
    topics: topics
  });
  this.stream.on('error', function (err) {
    (0, _logger.logError)('error on kafka', err);
    _this.hasError = true;
    setTimeout(function () {
      if (_this.hasError) {
        (0, _logger.logError)('error flag still on. preparing to exit in 2 seconds', topics);
        setTimeout(function () {
          return process.exit(1);
        }, 2000);
      }
    }, 15000);
  });
  this.stream.on('data', function (data) {
    _this.hasError = false;
    dataHandler(data, _this);
  });
  return this.stream;
};

exports.default = StreamHandler;