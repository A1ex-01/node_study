const { Label } = require("../app/database");

class LabelService {
  async create(name) {
    const result = await Label.create({ name });
    return result;
  }
}

module.exports = new LabelService();
