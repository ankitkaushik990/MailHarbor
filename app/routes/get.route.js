const { Router } = require("express");
const GetController = require("../controllers/get.controller");

class GetRoute {
  constructor() {
    this.path = "/msg";
    this.router = Router();
    this.getController = new GetController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/get`,
      this.getController.get.bind(this.getController)
    );
  }
}

module.exports = GetRoute;
