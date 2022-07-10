const sequelize = require("sequelize");
const { Moment, User, Comment } = require("../app/database");

class MomentServer {
  async create(content, user_id) {
    const result = await Moment.create({ content, user_id });
    return result;
  }
  async getMomentList(offset = 0, limit = 10) {
    offset = parseInt(offset);
    limit = parseInt(limit);
    const result = await Moment.findAll({
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Comment,
        },
      ],
    });
    return result;
  }
  async getMomentById(id) {
    const result = await Moment.findAll({ where: { id }, raw: true });
    return result;
  }
  async update(content, id) {
    const result = await Moment.update(
      { content },
      {
        where: {
          id,
        },
      }
    );
    return { affectRows: result[0] };
  }
  async remove(id) {
    const result = await Moment.destroy({
      where: {
        id,
      },
    });
    return { affectRows: result[0] };
  }
}
module.exports = new MomentServer();
