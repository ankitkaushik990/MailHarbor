const mongoose = require("mongoose");

// Define the schema for the message model
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^[\w-]+(?:\.[\w-]+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/,
      "Please provide a valid email",
    ],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = {
  Message: Message,
};
