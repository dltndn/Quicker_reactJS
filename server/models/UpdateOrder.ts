import { resolve } from "path";
import { Order, User } from "./DB/init-models";

export = {
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