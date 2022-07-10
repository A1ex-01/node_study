const userServer = require("../service/user.service");
const forge = require("node-forge");
const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;
  // 查询数据库是否有冲突
  const status = await userServer.findByName(username);
  // 有冲突发送错误
  if (status) {
    const error = new Error("users already exists");
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

const md5Password = async (ctx, next) => {
  const md = forge.md.md5.create();
  md.update(ctx.request.body.password);
  const result = md.digest().toHex();
  ctx.request.body.password = result;
  await next();
};
module.exports = {
  verifyUser,
  md5Password,
};
