const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { content, moment_id } = ctx.request.body;
    const user_id = ctx.user.id;
    const result = await commentService.create(content, moment_id, user_id);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
  async reply(ctx, next) {
    const { moment_id, content } = ctx.request.body;
    const { comment_id } = ctx.request.params;
    const { id: user_id } = ctx.user;
    const result = await commentService.reply(
      user_id,
      content,
      moment_id,
      comment_id
    );
    ctx.body = {
      code: 200,
      data: result,
    };
  }
  async update(ctx, next) {
    const { comment_id } = ctx.request.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(comment_id, content);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
  async list(ctx, next) {
    const { moment_id } = ctx.request.params;
    const result = await commentService.findAll(moment_id);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
  async remove(ctx, next) {
    const { comment_id } = ctx.request.params;
    const result = await commentService.deleteByMomentId(comment_id);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
}
module.exports = new CommentController();
