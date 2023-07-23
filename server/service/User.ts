import SelectUser from "../Maria/Commands/SelectUser"

export const findUserNameByWalletAddress = async (walletAddress : string) => {
  const user : {name : string} | null = await SelectUser.getUserName(walletAddress)
  return user
}