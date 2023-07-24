import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import SelectUser from "../Maria/Commands/SelectUser";

require("dotenv").config();

interface User {
  name: string;
}

describe("데이터 베이스 테스트", () => {

  beforeEach(() => {
    initModels(sequelize);
  });

  afterAll(() => {
    sequelize.close();
  })

  describe("사용자의 이름을 가지고 오는 서비스", () => {

    test("존재하는 지갑 주소", async () => {
      const userWallet = process.env.USER_WALLET
      // @ts-ignore
      const user: User | null = await SelectUser.getUserName(userWallet);
      expect(user?.name).toBe("김퀵커");  
    });
  
    test("존재하지 않는 지갑 주소", async () => {
      const user: User | null = await SelectUser.getUserName("ddd");
      expect(user).toBe(null);
    });
  })
});