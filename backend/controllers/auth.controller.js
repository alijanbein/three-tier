const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const HttpError = require("../utils/http-error");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  const userExist = await User.findOne({ username: username });
  if (!userExist) {
    const error = new HttpError("username or passwrod wrong?", 401);
    return next(error);
  }
  const isMatch = await userExist.matchPassword(password);
  console.log(isMatch);
  if (!isMatch) {
    const error = new HttpError(" passwrod wrong?", 405);
    return next(error);
  }

  const token = jwt.sign({ userExist }, "SECRETdawdaswdsawd");
  res.send({ status: "sucess", user: userExist, token: token });
};

exports.register = async (req, res, next) => {
  const { username, password, re_password } = req.body;
  const newUsername = await User.findOne({ username:username });
  if (newUsername || re_password != password) {
    console.log("error");
    
    const error = new HttpError("faild to register", 405);
    return next(error);
  }
  const newUser = new User();
  newUser.username = username;
  newUser.password = password;
  await newUser.save();
  res.send({ status: "succes", user: newUser });
};
