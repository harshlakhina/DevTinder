const validators = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },

    lastName: {
      type: String,
      minlength: 3,
      maxlength: 15,
    },

    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      tirm: true,
      required: true,
      validate(value) {
        if (!validators.isEmail(value))
          throw new Error("Invalid Email Address : " + value);
      },
    },

    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!validators.isStrongPassword(value))
          throw new Error("Please enter a strong password : " + value);
      },
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("please enter a valid gender");
        }
      },
    },

    age: {
      type: Number,
      min: 18,
    },

    stripeCustomerId: {
      type: String,
      required: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
      required: true,
    },

    skills: {
      type: [String],
    },

    about: {
      type: String,
    },

    photoUrl: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-image-illustration-285843601.jpg",
      validate(value) {
        if (!validators.isURL(value))
          throw new Error("Please enter a valid photo URL : " + value);
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

userSchema.methods.comparePassword = async function (userInputPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    userInputPassword,
    hashedPassword,
  );
  return isPasswordValid;
};
module.exports = mongoose.model("user", userSchema);
