const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    const result = await momentService.create(content, ctx.user.id);
    ctx.body = { code: 200, data: result };
  }
  async getMomentList(ctx, next) {
    const { offset, limit } = ctx.request.query;
    const result = await momentService.getMomentList(offset, limit);
    ctx.body = { code: 200, data: result };
  }
  async getMomentById(ctx, next) {
    const id = ctx.request.params.moment_id;
    const result = await momentService.getMomentById(id);
    ctx.body = { code: 200, data: result };
  }
  async update(ctx, next) {
    const result = await momentService.update(
      ctx.request.body.content,
      ctx.request.params.moment_id
    );
    ctx.body = { code: 200, data: result };
  }
  async remove(ctx, next) {
    const result = await momentService.remove(ctx.request.params.moment_id);
    ctx.body = { code: 200, data: result };
  }
  async createLabels(ctx, next) {
    ctx.body = {
      code: 200,
      data: {
        a: ctx.request.body.labels,
        b: ctx.params.moment_id,
      },
    };
  }
}
module.exports = new MomentController();
