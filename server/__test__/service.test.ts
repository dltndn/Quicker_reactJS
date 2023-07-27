import { findDestinationAndDepartureByOrderId, findOrdersByWalletAddress } from "../service/Order";
import { findRecentMessage, findRoomInfoByOrderNumber } from "../service/Room";
import { findUserNameByWalletAddress } from "../service/User";

require("dotenv").config();

describe("서비스 계층 테스트", () => {
  describe("지갑주소를 이용하여 사용자의 이름을 가지고 오는 서비스", () => {
    test("존재하는 지갑 주소", async () => {
      const query = {walletAddress : process.env.USER_WALLET};
      const user = await findUserNameByWalletAddress(query);
      expect(user?.name).toBe("김퀵커");
    });

    test("존재하지 않는 지갑 주소", async () => {
      const query = {walletAddress : null};
      const user = await findUserNameByWalletAddress(query);
      expect(user).toBe(null);
    });
  });

  describe("방에대한 정보를 오더 넘버를 이용하여 조회하는 서비스", () => {
    test("존재하지 않는 오더 넘버 입력", async () => {
      const query = {orderNum : 0}
      const roomInfo = await findRoomInfoByOrderNumber(query);
      expect(roomInfo).toBe(null);
    });

    test("존재하는 오더 넘버 입력", async () => {
      if (process.env.USER_ROOM_INFO === undefined) throw new Error(".env를 확인하세요")
      
      const query = {orderNum : 2}
      const resultString = process.env.USER_ROOM_INFO
      const roomInfo = await findRoomInfoByOrderNumber(query);
      const result = JSON.parse(resultString)
      expect(roomInfo).toStrictEqual(result);
    });
  });

  describe("출발지와 도착지의 주소 좌표를 데이터베이스에서 가지고 오는 서비스", () => {
    test("존재하지 않는 오더 넘버 입력", async () => {
      const query = {orderid : "0"}
      const instance = await findDestinationAndDepartureByOrderId(query);
      expect(instance).toBe(null);
    });

    test("존재하는 오더 넘버 입력", async () => {
      const query = { orderid: "2" };
      const result = {
        id: 2,
        Destination: { X: 126.493995014515, Y: 37.7446207414936 },
        Departure: { X: 126.673599070054, Y: 37.5142297784135, id: 2 }
      }
      
      const instance = await findDestinationAndDepartureByOrderId(query);
      expect(instance).toStrictEqual(result);
    });
  });

});
