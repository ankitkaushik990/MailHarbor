const { Router } = require("express");
const MsgController = require("../controllers/msg.controller");

class MsgRoute {
  constructor() {
    this.path = "/msg";
    this.router = Router();
    this.msgController = new MsgController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/send`,
      this.msgController.send.bind(this.msgController)
    );
  }
}

module.exports = MsgRoute;
