const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Brand is required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Brand title should be more than 3 characters "],
      maxlength: [30, "Brand title should be more than 30 characters "],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImgUrl = (doc) => {
  //return iage base url + image name
  if (doc.image) {
    const imgUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imgUrl;
  }
  console.log(doc);
};

brandSchema.post("init", (doc) => {
  //return iage base url + image name
  setImgUrl(doc);
});

brandSchema.post("save", (doc) => {
  setImgUrl(doc);
});
module.exports = mongoose.model("Brand", brandSchema);
