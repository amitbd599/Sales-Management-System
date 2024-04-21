const {
  UserOTPService,
  VerifyOTPService,
  LogoutService,
  CreateProfileService,
  UpdateProfileService,
  ReadProfileService,
} = require("../services/UserService");
exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req);
  return res.status(200).json(result);
};
