const { DataTypes } = require("sequelize");
const sequelize = require(".");

// 导出momnet模型
const MomentLabel = sequelize.define(
  "moment_label",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    moment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "moment_label",
    timestamps: true,
    sequelize,
  }
);
MomentLabel.sync();

// 建立表联系

module.exports = MomentLabel;
