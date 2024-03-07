const { Message } = require("../model/msg.schema");
const { HttpException } = require("../errors/httpexception");
const User = require("../model/user.schema");
const bcrypt = require("bcrypt");

class GetService {
  async get(userData) {
    if (
      !userData.email ||
      !/^[\w-]+(?:\.[\w-]+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/.test(userData.email)
    ) {
      throw new HttpException(400, "Invalid email address");
    }
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new HttpException(401, "Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordMatch) {
      throw new HttpException(401, "Invalid credentials");
    }

    const messages = await Message.find();

    return messages;
  }
}

module.exports = GetService;
