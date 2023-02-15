const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Product title should be more than 3 characters "],
      maxlength: [100, "Product title should be more than 100 characters "],
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    description: {
      type: String,
      require: [true, "Product description is required"],
      minlength: [20, "description should be more than 20 characters"],
    },
    quantity: {
      type: Number,
      require: [true, "Product quantity is required"],
    },
    sold: {
      type: String,
      default: 0, // nothing sold yet it starts with  0
    },
    price: {
      type: Number,
      require: [true, "Product price is required"],
      trim: true,
      max: [20, "Price should not be more than 20 characters"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    imageCover: {
      // outer photo
      type: [String],
      require: [true, "Product imageCover is required"],
    },
    images: [String], // inner photos
    // category
    category: {
      type: Schema.Types.ObjectId, //mongoose.Schema.objectId,
      ref: "Category",
      require: [true, "Product must belong to category"],
    },
    brand: {
      type: Schema.Types.ObjectId, //mongoose.Schema.objectId,
      ref: "Brand",
    },
    ratingAverage: {
      type: Number,
      min: [0, "Rating must be above or equal 1"],
      max: [5, "Rating must be below or equal 5"],
    },
  },
  { timestamps: true }
);

const setImgUrl = (doc) => {
  //return image base url + image name
  if (doc.imageCover) {
    const imgUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imgUrl;
  }
  if (doc.images) {
    doc.images = doc.images.map(
      (img) => `${process.env.BASE_URL}/products/${img}`
    );
  }
};

productSchema.post("init", (doc) => {
  //return iage base url + image name
  setImgUrl(doc);
});

productSchema.post("save", (doc) => {
  setImgUrl(doc);
});

module.exports = mongoose.model("Product", productSchema);
