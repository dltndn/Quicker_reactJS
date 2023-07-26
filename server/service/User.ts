import SelectUser from "../Maria/Commands/SelectUser"

export const findUserNameByWalletAddress = async (query : any) => {
  const walletAddress = query.walletAddress
  const user = await SelectUser.getUserName(walletAddress)
  return user
}