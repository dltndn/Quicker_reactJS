import { Order } from "../Models/init-models";

export default {
    updateOrder : async (userId : string, orderId : number) => {
        return new Promise ((resolve, reject) => {
            resolve(
                Order.update({ ID_DVRY : userId}, {
                    where: {
                        id: orderId
                    }
                })
            )
            reject({msg : "fail"})
        })
        
    }
}