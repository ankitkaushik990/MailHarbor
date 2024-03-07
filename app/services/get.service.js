const { Message } = require("../model/msg.schema");
const { getSchema } = require("../utils/validator");
const { HttpException } = require("../errors/httpexception");
const User = require("../model/user.schema");
const bcrypt = require("bcrypt");

class GetService {
  async get(userData) {
    const { error } = getSchema.validate(userData);
    if (error) {
      throw new HttpException(400, error.details[0].message);
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
