const CryptoJS = require("crypto-js");

require("dotenv").config();

// 암호화 메서드
export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, process.env.URL_CRYPTO_KEY).toString();
}

// 복호화 메서드
export function decrypt(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.URL_CRYPTO_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}