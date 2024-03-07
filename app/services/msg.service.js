const { Message } = require("../model/msg.schema");
const { msgSchema } = require("../utils/validator");
const { HttpException } = require("../errors/httpexception");
const nodemailer = require("nodemailer");
const logger = require("log4js").getLogger("middleware");

// Initialize nodemailer transporter outside the class
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "itstestpurposemail1@gmail.com",
    pass: "dypapjecgmngfbxd",
  },
});

class MsgService {
  async send(userData) {
    const { error } = msgSchema.validate(userData);
    if (error) {
      throw new HttpException(400, error.details[0].message);
    }
    const newMessage = new Message({
      name: userData.name,
      email: userData.email,
      message: userData.message,
    });
    await newMessage.save();

    // Send email asynchronously without waiting for its completion
    await this.sendEmail(userData);

    // Return response only after email is sent
    return "message sent successfully";
  }

  async sendEmail(userData) {
    // Constructing email body including message content and signature
    let emailContent = `<p>Name: ${userData.name}</p><p>Email: ${userData.email}</p><p>Message: ${userData.message}</p>`;
    let signature = `
        <table cellpadding="0" cellspacing="0" style="font-family: Arial; font-size: 14px;">
            <tr>
                <td style="vertical-align: top;">
                    <h2 style="margin: 0; font-size: 18px; color: #000; font-weight: bold;">Ankit Kaushik</h2>
                    <p style="margin: 0; color: #333;">The founder of message-service</p>
                    <p style="margin: 0; font-weight: 500; color: #333;">SDE || Backend Specialist || contact for more</p>
                </td>
                <td width="20"></td>
                <td style="vertical-align: top;">
                    <a href="https://www.linkedin.com/in/ankit-kaushik-me990/" style="text-decoration: none; background-color: #0077B5; padding: 5px; border-radius: 5px; display: inline-block;">
                        <img src="https://raw.githubusercontent.com/ankit-kaushik/message-service/main/assets/linkedin.png" alt="LinkedIn" width="24" style="display: block;">
                    </a>
                </td>
            </tr>
        </table>
    `;

    // Adding some space between email content and signature
    let space = '<p style="margin-bottom: 20px;"></p>';

    let mailOptions = {
      from: "itstestpurposemail1@gmail.com",
      to: "2002ankit2002@gmail.com",
      subject: "Got a message 🚀",
      html: emailContent + space + signature,
    };

    // Use promisified version of sendMail
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          logger.error("Error sending email:", err);
          reject(err);
        } else {
          logger.info("Email sent:", info.response);
          resolve(info);
        }
      });
    });
  }
}

module.exports = MsgService;
