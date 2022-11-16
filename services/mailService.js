const nodemailer = require('nodemailer');
const {mailSettings, bitakUrl} = require('../config/keys');

module.exports.sendMail = async (params) => {
    try {
      let info = await transporter.sendMail({
        from: mailSettings.auth.user,
        to: params.to, 
        subject: 'Confirm registration in Bitak',
        html: `
        <div
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome in <strong>Bitak</strong>.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas click the link below to confirm your registration</p>
          <a href=${bitakUrl}/${params.OTP} style="color: black; text-decoration: none; cursor: pointer;">Click me</a>
     </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };