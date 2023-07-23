import SelectUser from "../Maria/Commands/SelectUser"

export const findUserNameById = async (walletAddress : string) => {
  const user : {name : string} | null = await SelectUser.getUserName(walletAddress)
  return user
}
