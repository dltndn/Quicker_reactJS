import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Join_dateAttributes {
  id: string;
  year: string;
  month: string;
  date: string;
}

export type Join_datePk = "id";
export type Join_dateId = Join_date[Join_datePk];
export type Join_dateCreationAttributes = Join_dateAttributes;

export class Join_date extends Model<Join_dateAttributes, Join_dateCreationAttributes> implements Join_dateAttributes {
  id!: string;
  year!: string;
  month!: string;
  date!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Join_date {
    return Join_date.init({
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    month: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Join_date',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
