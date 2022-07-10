const { User, Comment } = require("../app/database");
class AuthServer {
  async usernameLogin(username) {
    const status = await User.findAll({
      where: {
        username,
      },
      raw: true,
    });
    return status;
  }
  async passwordLogin(user) {
    const status = await User.findAll({
      where: user,
      raw: true,
    });
    return status;
  }
  async checkResouce(tableName, user_id, id) {
    tableName = tableName.split();
    tableName[0].toUpperCase();
    tableName = tableName.join();
    console.log(tableName, user_id, id);
    const mod = require(`../app/models/${tableName}`);
    const result = await mod.findAll({
      where: { user_id, id },
    });
    return result.length;
  }
}

module.exports = new AuthServer();
