import crypto from "crypto";
import config from "../config";

export const cryptoUserInfo = (body: any) => {
  const secret = config.crypto.key;
  if (secret === undefined) {
    throw new Error("crypto secreat key not exist");
  }
  const user = body.User;
  const userBirthDate = body.Birthday;
  //NOTE : 전화번호를 기반으로 암호화한 id 사용
  const hashed = crypto
    .createHmac("sha256", secret)
    .update(user.contact)
    .digest("hex");
  user.id = hashed;
  userBirthDate.id = hashed;
  return {
    hashed,
    user,
    userBirthDate,
  };
};
