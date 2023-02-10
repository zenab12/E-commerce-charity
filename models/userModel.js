const mongoose = require("mongoose");

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
    //   passwordResetToken: {},
    //   passwordResetExpires: {},
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

const User = mongoose.model("User", userSchema);
module.exports = User;
