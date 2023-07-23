import SelectOrder from "../Maria/Commands/SelectOrder"

export const findDestinationAndDepartureByOrderId = async (query : any) => {
    const orderId = query.orderid
    const instance = await SelectOrder.location(parseInt(orderId))
    return instance
}