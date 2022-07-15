const authService = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const { Moment } = require("../app/database");
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 查询数据库是否有冲突
  const status = await authService.usernameLogin(username);
  // 有冲突发送错误
  if (!status.length) {
    const error = new Error("用户未注册~");
    return ctx.app.emit("error", error, ctx);
  }
  // 校对密码
  const passwordFix = await authService.passwordLogin({ username, password });
  if (!passwordFix.length) {
    const error = new Error("密码错误~");
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

async function verifyAuth(ctx, next) {
  // 验证token
  const authorization = ctx.headers.authorization;
  try {
    const token = authorization.replace("Bearer ", "");
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error("未授权的请求~");
    ctx.status = 401;
    return ctx.app.emit("error", error, ctx);
  }
}

async function verifyPermission(ctx, next) {
  const { id } = ctx.user;
  const [resorceKey] = Object.keys(ctx.params);
  const tableName = resorceKey.replace("_id", "");
  const status = await authService.checkResouce(
    tableName,
    id,
    ctx.params[resorceKey]
  );
  console.log("status", status);
  if (status) {
    await next();
  } else {
    ctx.status = 403;
    const error = new Error("you can not modify the content~");
    return ctx.app.emit("error", error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
