import { initModels } from "../../Maria/Models/init-models";
import { registerUser } from "../../service/User";
import { cryptoUserInfo } from "../../util/cryptoUserInfo";
import { sequelize } from "../connectors/sequelizeConnector";

// beforeAll(()=> {
//     initModels(sequelize)
// })

test("회원등록시 암호화 테스트", () => {
  const body = {
    User: {
      id: null,
      wallet_address: "0xalskme34krm3se",
      name: "홍길동",
      email: "hong@gmail.com",
      contact: "01012340194",
      manager: 0,
    },
    Birthday: {
      id: null,
      year: 2000,
      month: 1,
      date: 20,
    },
  };

  const result = cryptoUserInfo(body)

  const expectResult = {
    hashed : "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
    userInstance: {
      id: "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
      wallet_address: "0xalskme34krm3se",
      name: "홍길동",
      email: "hong@gmail.com",
      contact: "01012340194",
      manager: 0,
    },
    userBirthDate: {
      id: "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
      year: 2000,
      month: 1,
      date: 20,
    }
  };


//   registerUser(body);
  expect(result).toEqual(expectResult)
});
