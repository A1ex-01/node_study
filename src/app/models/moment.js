const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Comment = require("./comment");
const User = require("./user");

// 导出momnet模型
const Moment = sequelize.define(
  "moment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "moment",
    timestamps: true,
    sequelize,
  }
);
Moment.sync();

// 建立表联系
Moment.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});
Moment.hasMany(Comment, {
  foreignKey: "moment_id",
});
Comment.belongsTo(Moment, {
  foreignKey: "moment_id",
});

module.exports = Moment;
