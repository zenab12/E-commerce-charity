const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "category is required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "category title should be more than 3 characters "],
      maxlength: [30, "category title should be more than 30 characters "],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },
  },
  { timestamps: true }
);

const setImgUrl = (doc) => {
  //return iage base url + image name
  if (doc.image) {
    const imgUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imgUrl;
  }
};

categorySchema.post("init", (doc) => {
  //return iage base url + image name
  setImgUrl(doc);
});

categorySchema.post("save", (doc) => {
  setImgUrl(doc);
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
