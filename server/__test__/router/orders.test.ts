import { sequelize } from "../connectors/sequelizeConnector";
import { initModels } from "../../Maria/Models/init-models";
import keys from "../../config/keys";
import { findOrdersByWalletAddress } from "../../service/Order";

describe("/orders", () => {
  describe("/ 라우터 테스트", () => {

    beforeAll(() => {
      initModels(sequelize);
    });

    afterAll(() => {
      sequelize.close();
    });

    describe("의뢰수락이 가능한 의뢰목록을 조회하는 서비스", () => {
      test("사용자로 등록된 배송원 지갑주소 입력", async () => {
        const expectResult = [
          {
            id: 8,
            PAYMENT: 0,
            DETAIL: "물품 세부사항",
            Transportation: {
              WALKING: 0,
              BICYCLE: 0,
              SCOOTER: 0,
              BIKE: 1,
              CAR: 0,
              TRUCK: 0,
            },
            Destination: {
              X: 126.495300994615,
              Y: 37.7426236869778,
              DETAIL: "2동 202호",
            },
            Departure: {
              X: 126.673599070054,
              Y: 37.5142297784135,
              DETAIL: "1동 101호",
            },
            Product: { WIDTH: 10, LENGTH: 10, HEIGHT: 10, WEIGHT: 10 },
          },
        ];
        const result = await findOrdersByWalletAddress({
          userWalletAdress: keys.test.USER_WALLET,
        });
        expect(result).toEqual(expectResult);
      });

      test("사용자로 등록되어 있지 않은 지갑주소 입력", () => {
        expect(async () => {await findOrdersByWalletAddress({userWalletAdress: "0x23uo2ouhfn2jbifaluw"}) }).rejects.toThrow()
      });

      test("해당 의뢰의 의뢰인 지갑주소 입력", async () => {
        const result = await findOrdersByWalletAddress({userWalletAdress: keys.test.REQUESTER_WALLET})
        expect(result).toEqual([])
      });
    });
  });
});
