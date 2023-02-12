const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
      maxlength: [20, "A user name must have less or equal then 20 characters"],
      minlength: [3, "A user name must have more or equal then 3 characters"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Please confirm your password"],
    // },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    profileImg: {
      type: String,
      default: "default.jpg",
    },
    active: { type: Boolean, default: true },

    //we will make seperated image model
    cart: {
      type: Array,
      default: [],
    },
    savedCards: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    paymentInfo: {
      type: Object,
      default: {},
    },
    notifications: {
      type: Array,
      default: [],
    },

    //   passwordChangedAt: {},
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

const setImgUrl = (doc) => {
  //return iage base url + image name
  if (doc.profileImg) {
    const imgUrl = `${process.env.BASE_URL}/users/${doc.profileImg}`;
    doc.profileImg = imgUrl;
  }
};

userSchema.post("init", (doc) => {
  //return iage base url + image name
  setImgUrl(doc);
});

userSchema.post("save", (doc) => {
  setImgUrl(doc);
});


// generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to 
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log("from user model",this.passwordResetToken);
  // Set expire 
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
}


//sign JWT and return 
userSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
};

//,{ expiresIn: process.env.JWT_EXPIRE}
const User = mongoose.model("User", userSchema);
module.exports = User;

