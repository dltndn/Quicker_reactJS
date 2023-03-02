import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface testAttributes {
  idtest: number;
  testcol: string;
  testcol1: string;
  testcol2: string;
}

export type testPk = "idtest";
export type testId = test[testPk];
export type testCreationAttributes = testAttributes;

export class test extends Model<testAttributes, testCreationAttributes> implements testAttributes {
  idtest!: number;
  testcol!: string;
  testcol1!: string;
  testcol2!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof test {
    return test.init({
    idtest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    testcol: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    testcol1: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    testcol2: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'test',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtest" },
        ]
      },
    ]
  });
  }
}
