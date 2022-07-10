const { Comment } = require("../app/database");

class CommentServer {
  async create(content, moment_id, user_id) {
    const result = await Comment.create({
      content,
      moment_id: moment_id,
      user_id,
    });
    return result;
  }
  async reply(user_id, content, moment_id, comment_id) {
    const result = await Comment.create({
      user_id,
      content,
      moment_id,
      comment_id,
    });
    return result;
  }
  async update(comment_id, content) {
    const [result] = await Comment.update(
      { content },
      {
        where: { comment_id },
      }
    );
    return { affectRows: result };
  }
  async findAll(moment_id) {
    return `查找动态${moment_id}所有评论`;
  }
}
module.exports = new CommentServer();
