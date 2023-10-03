import CreateUser from "../Maria/Commands/CreateUser"
import SelectUser from "../Maria/Commands/SelectUser"
import { updateImageId } from "../Maria/Commands/updateUser";
import keys from "../config/keys";
import { cryptoUserInfo } from "../util/cryptoUserInfo";

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
  const {userInstance, userBirthDate, hashed} = cryptoUserInfo(body)
  
  await CreateUser.registerUser(userInstance, userBirthDate, hashed);
}

export const updateUserImageId = async (body: any) => {
  const {walletAddress, imageId} = body as {walletAddress : string, imageId : string}
  const user = await SelectUser.getUserId(walletAddress)
  if (user !== null) {
    console.log(user.id, imageId)
    await updateImageId(user.id, imageId)
  }
  else return null
};

export const findUserImageId =async (query:any) => {
  const walletAddress = query.walletAddress
  const user = await SelectUser.getUserId(walletAddress)
  if (user !== null) {
    return await SelectUser.findImageByUserId(user.id)
  }
  else return null
}