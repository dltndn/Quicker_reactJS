import SelectUser from "../Maria/Commands/SelectUser"

export const findUserNameByWalletAddress = async (body : any) => {
  const walletAddress = body.walletAddress
  const user = await SelectUser.getUserName(walletAddress)
  return user
}