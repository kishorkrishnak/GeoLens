const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeAccessToken,
} = require("./jwt");
const { generateOtp, validateOtp } = require("./otp_handler");
const { sendSms } = require("./sms_sender");
const { encryptPassword, verifyPassword } = require("./bcrypt");

generateOtp();

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeAccessToken,
  generateOtp,
  validateOtp,
  sendSms,
  encryptPassword,
  verifyPassword,
};
