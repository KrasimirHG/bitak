const nodemailer = require('nodemailer');
const {mailSettings, bitakUrl} = require('../config/keys');
const transporter = nodemailer.createTransport(mailSettings);

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
          <a href=${bitakUrl}/api/users/verifyOtp?email=${params.to}&otp=${params.OTP} style="color: black; text-decoration: none; cursor: pointer;">Click me</a>
     </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
// module.exports.sendMail = async function() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }