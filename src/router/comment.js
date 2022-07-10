const Router = require("koa-router");
const {
  create,
  reply,
  update,
  list,
} = require("../controller/comment.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const commentRouter = new Router({ prefix: "/comment" });

commentRouter.get("/:moment_id", list);

commentRouter.post("/", verifyAuth, create);

commentRouter.post("/:comment_id/reply", verifyAuth, reply);

commentRouter.patch("/:comment_id", verifyAuth, verifyPermission, update);

module.exports = commentRouter;
