const Router = require("koa-router");
const authRouter = new Router({ prefix: "/login" });
const { login, success } = require("../controller/auth.controller");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
const { datalizeError } = require("../middleware/error.middleware");
const datalize = require("datalize");
const { md5Password } = require("../middleware/user.middleware");
const filed = datalize.field;
authRouter.post(
  "/",
  datalize([
    filed("username").length(5, 16).required(),
    filed("password").length(5, 16).required(),
  ]),
  datalizeError,
  md5Password,
  verifyLogin,
  login
);

// 验证登录
authRouter.post("/test", verifyAuth, success);

module.exports = authRouter;
