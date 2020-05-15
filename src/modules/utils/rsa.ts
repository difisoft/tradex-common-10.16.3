import * as crypto from "crypto";

const rsaEncrypt = (data: string, publicKey: string) => {
  const buffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt({key: publicKey, padding: 1}, buffer);
  return encrypted.toString("base64");
};

const rsaDecrypt = (data: string, privateKey: string) => {
  const buffer = Buffer.from(data, "base64");
  const decrypted = crypto.privateDecrypt({key: privateKey, padding: 1}, buffer);
  return decrypted.toString("utf8");
};

export {
  rsaEncrypt,
  rsaDecrypt
}