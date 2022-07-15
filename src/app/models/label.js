const { DataTypes } = require("sequelize");
const sequelize = require(".");

// 导出momnet模型
const Label = sequelize.define(
  "label",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "label",
    timestamps: true,
    sequelize,
  }
);
Label.sync();

module.exports = Label;
