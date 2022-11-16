const otpGenerator = require('otp-generator');
const {otpLength, otpConfig} = require('../config/keys');

module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(otpLength, otpConfig);
    return OTP;
  };