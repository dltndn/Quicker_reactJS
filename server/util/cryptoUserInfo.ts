import keys from "../config/keys";
import crypto from "crypto"

export const cryptoUserInfo = (body : any) => {
    const secret = keys.crypto.key;
    if (secret === undefined) {
        throw new Error ('crypto secreat key not exist')
    }
    const userInstance = body.User;
    const userBirthDate = body.Birthday;
    //NOTE : 전화번호를 기반으로 암호화한 id 사용
    const hashed = crypto
      .createHmac("sha256", secret)
      .update(userInstance.contact)
      .digest("hex");
    userInstance.id = hashed;
    userBirthDate.id = hashed;
    return {
      hashed,
      userInstance,
      userBirthDate
    }
  }