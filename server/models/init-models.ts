import type { Sequelize } from "sequelize";
import { Birth_date as _Birth_date } from "./Birth_date";
import type { Birth_dateAttributes, Birth_dateCreationAttributes } from "./Birth_date";
import { Join_date as _Join_date } from "./Join_date";
import type { Join_dateAttributes, Join_dateCreationAttributes } from "./Join_date";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { test as _test } from "./test";
import type { testAttributes, testCreationAttributes } from "./test";

export {
  _Birth_date as Birth_date,
  _Join_date as Join_date,
  _User as User,
  _test as test,
};

export type {
  Birth_dateAttributes,
  Birth_dateCreationAttributes,
  Join_dateAttributes,
  Join_dateCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  testAttributes,
  testCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Birth_date = _Birth_date.initModel(sequelize);
  const Join_date = _Join_date.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const test = _test.initModel(sequelize);


  return {
    Birth_date: Birth_date,
    Join_date: Join_date,
    User: User,
    test: test,
  };
}
