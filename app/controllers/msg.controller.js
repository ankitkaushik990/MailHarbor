const MsgService = require("../services/msg.service");

class MsgController {
  constructor() {
    this.msgService = new MsgService();
  }

  async send(req, res) {
    const userData = req.body;
    const result = await this.msgService.send(userData);
    res.status(200).json({ message: result });
  }
}

module.exports = MsgController;
