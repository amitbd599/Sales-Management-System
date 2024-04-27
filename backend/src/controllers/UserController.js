let md5 = require("md5");
const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");
//! Create new Admin
exports.register = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.password = md5(req.body.password);
    let data = await UserModel.create(reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(500).json({ status: "error", error: e });
  }
};

//! Admin Login
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.password = md5(req.body.password);
    let data = await UserModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 1, email: 1 } },
    ]);

    if (data.length > 0) {
      let token = EncodeToken(data[0]["email"]);

      let options = {
        maxAge: process.env.Cookie_Expire_Time,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // Set cookie
      res.cookie("Token", token, options);
      res.status(200).json({ status: "success", token: token, data: data[0] });
    } else {
      res.status(200).json({ status: "unauthorized", data: data });
    }
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.EmailVerifyData = async (req, res) => {
  try {
    let reqBody = req.body;

    let data = await UserModel.aggregate([
      { $match: reqBody },
      { $project: { email: 1, password: 1 } },
    ]);

    if (data.length > 0) {
      res.status(200).json({ status: "success", data: data[0] });
    } else {
      res.status(200).json({ status: "unauthorized", data: data });
    }
  } catch (e) {
    res.status(200).json({ status: "Fail", error: e });
  }
};
