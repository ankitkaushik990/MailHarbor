const mongoose = require("mongoose");

class Database {
  constructor(dbUrl, dbName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
  }

  async connect() {
    try {
      await mongoose.connect(this.dbUrl, {
        dbName: this.dbName,
      });
      console.log("Connected to MongoDB Server 🚀");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    }
  }
}

module.exports = Database;
