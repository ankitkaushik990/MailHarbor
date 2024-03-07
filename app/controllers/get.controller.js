const GetService = require("../services/get.service");

class GetController {
  constructor() {
    this.getService = new GetService();
  }

  async get(req, res) {
    const userData = req.body;
    const result = await this.getService.get(userData);
    res.status(200).json({ message: result });
  }
}

module.exports = GetController;
