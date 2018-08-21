import {createClient} from 'node-zookeeper-client';
import {logError, logger} from "../log/logger";

let zkClient = null;
let connected = false;
let cachedFunctions = [];

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
  zkClient = createClient(conf.zkUrls[0]);
  connected = false;
  cachedFunctions = [];
  zkClient.once('connected', () => {
    logger.info('connected to zk server');
    connected = true;
    cachedFunctions.forEach(func => func(zkClient));
    cachedFunctions = [];
  });
  zkClient.on('disconnected', (e) => logError('disconnect', e));
  console.info('connecting...');
  zkClient.connect();
}

export {
  zk,
  init,
}
