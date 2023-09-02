import CreateUser from "../Maria/Commands/CreateUser"
import SelectUser from "../Maria/Commands/SelectUser"
import keys from "../config/keys";

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
  
  
  
  // await CreateUser.registerUser(userInstance, userBirthDate, hashed);
}