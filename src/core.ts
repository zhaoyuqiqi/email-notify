import nodemailer from "nodemailer";
import config from "./config";

const { MAIL_PASSWORD, MAIL_USERNAME, MAIL_RECEIVER } = config;
console.log(config);
const transporter = nodemailer.createTransport({
  host: "smtp.126.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

export function sendEmail(title: string, content: string) {
  return transporter.sendMail({
    from: `github Bot <${MAIL_USERNAME}>`,
    to: MAIL_RECEIVER,
    subject: title,
    text: content,
  });
}
