const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Moment = require("./moment");
const User = require("./user");

const Comment = sequelize.define(
  "comments",
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
    moment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
    sequelize,
  }
);
Comment.sync();

// 建立表联系;
// Comment.belongsTo(Moment, {
//   foreignKey: "moment_id",
// });
// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });
// Comment.belongsTo(Comment, {
//   foreignKey: "comment_id",
// });

module.exports = Comment;
