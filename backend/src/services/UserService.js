const UserModel = require("../models/UserModel");
const EmailSend = require("../utility/EmailHelper");

const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let emailText = "Your verification code: " + code;
    let emailSubject = "Email verification";
    let sendEmail = await EmailSend(email, emailText, emailSubject);
    const data = await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: true, data:data, msg: "6 digit OTP code has been send!" };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const VerifyOTPService = async () => {};
const LogoutService = async () => {};
const CreateProfileService = async () => {};
const UpdateProfileService = async () => {};
const ReadProfileService = async () => {};

module.exports = {
  UserOTPService,
  VerifyOTPService,
  LogoutService,
  CreateProfileService,
  UpdateProfileService,
  ReadProfileService,
};
