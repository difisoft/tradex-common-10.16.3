import * as fs from 'fs';
export const TRADEX_DOMAIN = 'tradex';

export function processJwtKey(conf: any) {
  if (conf.domain === TRADEX_DOMAIN) {
    processKey(conf);
    conf.jwt.domains && Object.keys(conf.jwt.domains).forEach((domain: any) => processKey(conf, domain));
  } else {
    processKey(conf.domain);
  }
  conf.getJwt = () => conf.domain === TRADEX_DOMAIN || !conf.domain ? conf.jwt : conf.jwt.domains[conf.domain]
}


function processKey(conf: any, domain:string=null) {
    let obj = conf.jwt;
    if (domain) {
      obj = obj.domains[domain];
    }
  
    if (!obj) {
      return
    }
  
  
    if (obj.privateKeyFile) {
      obj.privateKey = fs.readFileSync(obj.privateKeyFile, 'utf8');
    }
    
    if (obj.publicKeyFile) {
      obj.publicKey = fs.readFileSync(obj.publicKeyFile, 'utf8');
    }  
  }