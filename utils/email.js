const nodemailer = require("nodemailer");
const pug = require("pug");
const { htmlToText } = require("html-to-text");
const nodemailerSendgrid = require("nodemailer-sendgrid");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Daro Van <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_PASSWORD,
        })
      );
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1 render HTML based on a pug tempalte
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2 define email option

    const mailOptions = {
      // from: this.from,
      from: process.env.SENDGRID_EMAIL_FROM,
      /*
        form:
          process.env.NODE_ENV === "development"
            ? this.from
            : process.env.SENDGRID_EMAIL_FROM,
            */
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText(html),
    };

    // 3 Create a transport and send email
    return await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("Welcome", "Welcome to the Adventure Family!");
  }

  async sendPassWordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 min)"
    );
  }
};
