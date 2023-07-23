import { findDestinationAndDepartureByOrderId } from "../service/Order";
import { findRoomInfoByOrderNumber } from "../service/Room";
import { findUserNameByWalletAddress } from "../service/User";

require("dotenv").config();

describe("서비스 계층 테스트", () => {
  describe("지갑주소를 이용하여 사용자의 이름을 가지고 오는 서비스", () => {
    test("존재하는 지갑 주소", async () => {
      const userWallet = process.env.USER_WALLET;
      // @ts-ignore
      const user: { name: string } | null = await findUserNameByWalletAddress(userWallet);
      expect(user?.name).toBe("김퀵커");
    });

    test("존재하지 않는 지갑 주소", async () => {
      const user: { name: string } | null = await findUserNameByWalletAddress(
        "ddd"
      );
      expect(user).toBe(null);
    });
  });

  describe("방에대한 정보를 오더 넘버를 이용하여 조회하는 서비스", () => {
    test("존재하지 않는 오더 넘버 입력", async () => {
      const roomInfo = await findRoomInfoByOrderNumber(0);
      expect(roomInfo).toBe(null);
    });

    test("존재하는 오더 넘버 입력", async () => {
      if (process.env.USER_ROOM_INFO === undefined) throw new Error(".env를 확인하세요")
      
      const resultString = process.env.USER_ROOM_INFO
      const roomInfo = await findRoomInfoByOrderNumber(35);
      
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
      const query = { orderid: "35" };
      const result = {
        id: 35,
        'Destination.X': 126.493995014515,
        'Destination.Y': 37.7446207414936,
        'Departure.X': 127.023150432187,
        'Departure.Y': 37.5182112402056,
        'Departure.id': 35
      }

      const instance = await findDestinationAndDepartureByOrderId(query);
      expect(instance).toStrictEqual(result);
    });
  });
});
