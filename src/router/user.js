const Router = require("koa-router");

const userRouter = new Router({ prefix: "/users" });

const { create, findAll } = require("../controller/user.controller");
const { verifyUser, md5Password } = require("../middleware/user.middleware");

const datalize = require("datalize");
const { datalizeError } = require("../middleware/error.middleware");
const filed = datalize.field;

//  创建用户
userRouter.post(
  "/register",
  datalize([
    filed("username").length(5, 16).required(),
    filed("password").length(5, 16).required(),
  ]),
  datalizeError,
  verifyUser,
  md5Password,
  create
);

// 查询所有用户
userRouter.get("/all", findAll);

module.exports = userRouter;
