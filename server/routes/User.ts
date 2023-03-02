import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  UserID: number;
  wallet_adress: string;
  name: string;
  email: string;
  contact: string;
  manager: any;
}

export type UserPk = "UserID";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "UserID" | "manager";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  UserID!: number;
  wallet_adress!: string;
  name!: string;
  email!: string;
  contact!: string;
  manager!: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wallet_adress: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    manager: {
      type: DataTypes.BLOB,
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
  }
}
