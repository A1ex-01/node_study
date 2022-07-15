const Koa = require("koa");
const app = new Koa();
const userRouter = require("../router/user");
const koaBody = require("koa-body");
const loginRouter = require("../router/auth");
const momentRouter = require("../router/moment");
const commentRouter = require("../router/comment");
const labelRouter = require("../router/label");

app.use(koaBody());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
app.use(momentRouter.routes()).use(momentRouter.allowedMethods());
app.use(commentRouter.routes()).use(commentRouter.allowedMethods());
app.use(labelRouter.routes()).use(labelRouter.allowedMethods());
// 错误监听
app.on("error", (error, ctx) => {
  ctx.body = {
    code: ctx.status,
    message: error.message,
  };
});

module.exports = app;
