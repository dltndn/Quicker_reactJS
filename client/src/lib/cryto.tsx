import CryptoJS from "crypto-js";

// 암호화 메서드
export function encrypt(data : any) { 
    if (typeof process.env.REACT_APP_URL_CRYPTO_KEY === "string") {
        return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_URL_CRYPTO_KEY).toString();
    }
    return "fail"
}

// 복호화 메서드
export function decrypt(encryptedText :string) {
  if (typeof process.env.REACT_APP_URL_CRYPTO_KEY === "string") {
    const bytes  = CryptoJS.AES.decrypt( encryptedText, process.env.REACT_APP_URL_CRYPTO_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
