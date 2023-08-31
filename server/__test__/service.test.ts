import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import { initModels } from "../Maria/Models/init-models";
import keys from "../config/keys";
import { findDestinationAndDepartureByOrderId } from "../service/Order";
import { findUserNameByWalletAddress } from "../service/User";
 "../"

 const sequelize = new Sequelize("Quicker", "root", "11111111", {
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  logging: false
});



describe("서비스 계층 테스트", () => {
  
  
  beforeAll(() => {    
    initModels(sequelize);
  });

  afterAll(() => {
    sequelize.close();
  });

  describe("지갑주소를 이용하여 사용자의 이름을 가지고 오는 서비스", () => {
    test("존재하는 지갑 주소", async () => {
      const query = { walletAddress: keys.test.USER_WALLET };
      const user = await findUserNameByWalletAddress(query);
      expect(user?.name).toBe("김퀵커");
    });

    test("존재하지 않는 지갑 주소", async () => {
      const query = { walletAddress: "아무개" };
      const user = await findUserNameByWalletAddress(query);
      expect(user).toBe(null);
    });
  });

  describe("출발지와 도착지의 주소 좌표를 데이터베이스에서 가지고 오는 서비스", () => {
    test("존재하는 오더 넘버 입력", async () => {
      const expectResult =  {
       id: 2,
        Destination: { X: 127.049593854342, Y: 37.5712239267109 },
        Departure: { X: 127.116522400337, Y: 37.5377319989174, id: 2 }
      }

      const query = { orderid: "2" };
      const instance = await findDestinationAndDepartureByOrderId(query);
      expect(instance).toStrictEqual(expectResult);
    });

    test("존재하지 않는 오더 넘버 입력", async () => {
      const query = {orderid : "0"}
      const instance = await findDestinationAndDepartureByOrderId(query);
      expect(instance).toBe(null);
    });
  });
  
});
