const { User } = require("../app/database");

class UserService {
  async create(user) {
    // 将用户数据存储到数据库
    const result = await User.create({ ...user });
    return result;
  }
  async findAll() {
    const result = await User.findAll();
    return result;
  }
  async findByName(name) {
    const result = await User.findAll({
      where: {
        username: name,
      },
    });
    return Boolean(result.length);
  }
}
module.exports = new UserService();
