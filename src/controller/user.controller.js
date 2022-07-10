const userServer = require("../service/user.service");
class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数
    const user = ctx.request.body;
    // 插入数据
    let result = await userServer.create(user);
    // 隐藏 password
    result = JSON.parse(JSON.stringify(result));
    delete result.password;
    // 响应数据
    ctx.body = { code: 200, data: result };
    next();
  }
  async findAll(ctx, next) {
    // 查询数据
    const result = await userServer.findAll();
    // 响应数据
    ctx.body = { code: 200, data: result };
    await next();
  }
}
module.exports = new UserController();
