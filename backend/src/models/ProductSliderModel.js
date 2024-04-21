const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String },
    img6: { type: String },
    img7: { type: String },
    img8: { type: String },

    title: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },

    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductSliderModel = mongoose.model("productsliders", DataSchema);

module.exports = ProductSliderModel;
