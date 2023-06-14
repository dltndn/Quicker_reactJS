import crypto from "crypto"

require("dotenv").config();

const algorithm = 'aes-256-gcm';
const iv = crypto.randomBytes(16); // 초기화 벡터 생성
const key =  process.env.URL_CRYPTO_KEY

// 암호화 메서드
export function encrypt(text: string): string {
    if (typeof key !== "undefined") {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    return "fail"
  }

// 복호화 메서드
export function decrypt(encryptedText: string): string {
    if (typeof key !== "undefined") {
        const decipher = crypto.createDecipheriv(algorithm,key,iv)
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        return decrypted;
    }
    return "fail"
}


