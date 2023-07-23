import { findRoomInfoByOrderNumber } from "../service/Room";
import { findUserNameByWalletAddress } from "../service/User";

require("dotenv").config();

describe("서비스 계층 테스트", () => {
  describe("지갑주소를 이용하여 사용자의 이름을 가지고 오는 서비스", () => {
    test("존재하는 지갑 주소", async () => {
      const userWallet = process.env.USER_WALLET;
      // @ts-ignore
      const user: {name : string} | null = await findUserNameByWalletAddress(userWallet);
      expect(user?.name).toBe("김퀵커");
    });

    test("존재하지 않는 지갑 주소", async () => {
      const user: {name : string} | null = await findUserNameByWalletAddress("ddd");
      expect(user).toBe(null);
    });
  });

  /**
   * @TODO : 추후 오더 생성후 존재하는 데이터 기준으로 성공하는 테스트 필요
   */
  describe("방에대한 정보를 오더 넘버를 이용하여 조회하는 서비스", () => {
    test("존재하지 않는 오더 넘버 입력", async () => {
      const roomInfo = await findRoomInfoByOrderNumber(0);
      expect(roomInfo).toBe(null);
    });


    test("존재하는 오더 넘버 입력", async () => {
        const roomInfo = await findRoomInfoByOrderNumber(35);
        // @ts-ignore
        expect(JSON.stringify(roomInfo)).toBe(process.env.USER_ROOM_INFO);
    });
  });
});
