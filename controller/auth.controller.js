const Company = require("../model/Company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup
const signUp = async (req, res) => {
  const {
    companyEmail,
    companyPassword,
    companyName,
    companyAddress,
    companySector,
  } = req.body;
  if (
    !companyEmail ||
    !companyPassword ||
    !companyName ||
    !companyAddress ||
    !companySector
  )
    return res.status(400).json({ message: "Please complete the form." });

  const duplicate = await Company.findOne({
    companyEmail: companyEmail,
  }).exec();
  if (duplicate)
    return res.status(409).json({
      succes: false,
      message: "User already exist",
    });

  try {
    const hashedPassword = await bcrypt.hash(companyPassword, 10);
    const company = await Company.create({
      companyEmail,
      companyPassword: hashedPassword,
      companyName,
      companyAddress,
      companySector,
    });
    res.status(200).json({
      succes: true,
      message: `User for ${company.companyName} created`,
    });
  } catch (err) {
    res.status(500).json({ succes: false, message: error.message });
  }
};

// login
const logIn = async (req, res) => {
  const { companyEmail, companyPassword } = req.body;
  if (!companyEmail || !companyPassword)
    return res
      .status(400)
      .json({ succes: false, message: "Email and password required" });

  const foundUser = await Company.findOne({
    companyEmail: companyEmail,
  }).exec();
  if (!foundUser)
    return res
      .status(401)
      .json({ success: false, message: "User not found, please sign up" });

  const match = await bcrypt.compare(
    companyPassword,
    foundUser.companyPassword
  );
  if (match) {
    const accessToken = jwt.sign(
      {
        _id: foundUser._id,
        companyEmail: companyEmail,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie(
      "userProfile",
      { accessToken, companyUsername: foundUser.companyUsername },
      {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 3600 * 1000,
      }
    );
    res.status(200).json({
      success: true,
      message: "User logged in",
      data: { accessToken },
    });
  } else {
    res
      .status(401)
      .json({ succes: false, message: "Email or password incorrect" });
  }
};

module.exports = {
  signUp,
  logIn,
};
