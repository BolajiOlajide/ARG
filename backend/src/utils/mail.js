const nodemailer = require('nodemailer');


exports.transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

exports.makeANiceEmail = text => `<div class="email" style="
  border: 1px solid black;
  padding: 20px;
  font-family: san-serif;
  line-height: 2;
  font-size: 20px;
">
  <h2>Hello There!</h2>
  <p>${text}</p>

  <p>😘, Proton!</p>
</div>`;
