const authService = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthServer {
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    const status = await authService.passwordLogin({ username, password });
    const { id, username: name } = status[0];
    // 生成token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 2,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 200,
      data: { id, name, token },
    };
    await next();
  }
  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}
module.exports = new AuthServer();
