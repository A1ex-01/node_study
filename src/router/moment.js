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
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);

momentRouter.get("/", getMomentList);

momentRouter.get("/:moment_id", getMomentById);

momentRouter.patch("/:moment_id", verifyAuth, verifyPermission, update);

momentRouter.delete("/:moment_id", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
