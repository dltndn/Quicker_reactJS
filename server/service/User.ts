import CreateUser from "../Maria/Commands/CreateUser"
import SelectUser from "../Maria/Commands/SelectUser"

const crypto = require("crypto");

export const findUserNameByWalletAddress = async (query : any) => {
  const walletAddress = query.walletAddress
  const user = await SelectUser.getUserName(walletAddress)
  return user
}

export const findUserId = async (walletAddress : any) => {
  const userId = await SelectUser.getUserId(walletAddress);
  return userId
}

export const registerUser = async (body : any) => {
  const secret = process.env.cryptoKey;
  const userInstance = body.User;
  const userBirthDate = body.Birthday;
  //NOTE : 전화번호를 기반으로 암호화한 id 사용
  const hashed = crypto
    .createHmac("sha256", secret)
    .update(userInstance.contact)
    .digest("hex");
  userInstance.id = hashed;
  userBirthDate.id = hashed;
  await CreateUser.registerUser(userInstance, userBirthDate, hashed);
}

