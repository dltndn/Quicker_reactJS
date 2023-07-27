import SelectOrder from "../Maria/Commands/SelectOrder"
import SelectUser from "../Maria/Commands/SelectUser"

export const findDestinationAndDepartureByOrderId = async (query : any) => {
    const orderId = query.orderid
    const instance = await SelectOrder.location(parseInt(orderId))
    return instance
}

export const findOrdersByWalletAddress = async (query: any) => {
    const userWalletAddress = query.userWalletAdress;
    const userId = await SelectUser.getUserId(userWalletAddress);
    if (userId === null) {
        throw new Error("Not exist name")
    }
    const orders = await SelectOrder.getRequests(userId.id);
    return orders
}