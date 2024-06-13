const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("book", bookSchema);
