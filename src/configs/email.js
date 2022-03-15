const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "081d4dfbc8c897", // generated ethereal user
    pass: "25cf78a97f99e6", // generated ethereal password
  },
});

module.exports = transporter;
