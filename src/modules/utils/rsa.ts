import * as crypto from "crypto";

const rsaEncrypt = (data: string, publicKey: string) => {
  const buffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

const rsaDecrypt = (data: string, privateKey: string) => {
  const buffer = Buffer.from(data, "base64");
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
};

export {
  rsaEncrypt,
  rsaDecrypt
}