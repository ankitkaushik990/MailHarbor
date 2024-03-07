const cors = require("cors");
const express = require("express");
require("express-async-errors");
const helmet = require("helmet");
const { PORT } = require("../config/env");
const { DB_URL, DB_name } = require("../config/env");
const Database = require("../config/database");
const routes = require("./routes");
const { errorMiddleware } = require("./middleware/error.middleware");

class App {
  constructor() {
    this.app = express();
    this.port = PORT;
    this.routes = routes;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorMiddleware();
  }

  initializeMiddlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes() {
    this.routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.info(`🚀 App listening on port ${this.port}`);
    });
    const db = new Database(DB_URL, DB_name);
    await db.connect();
  }
}

module.exports = App;
