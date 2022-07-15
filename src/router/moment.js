const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  getMomentList,
  getMomentById,
  update,
  remove,
  createLabels,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
// 添加标签
momentRouter.post("/:moment_id/labels", verifyAuth, createLabels);

momentRouter.get("/", getMomentList);

momentRouter.get("/:moment_id", getMomentById);

momentRouter.patch("/:moment_id", verifyAuth, verifyPermission, update);

momentRouter.delete("/:moment_id", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
