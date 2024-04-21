const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {
  let key = "123-ABC-**";
  let expire = "24h";
  let payload = { email, user_id };
  return jwt.sign(payload, key, { expiresIn: expire });
};
exports.DecodeToken = () => {
  try {
    let key = "123-ABC-**";
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    return null;
  }
};
