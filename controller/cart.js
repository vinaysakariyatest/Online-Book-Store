const user = require("../models/user");
const book = require("../models/book");
const cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.decoded.id;

    const productId = req.params.id;

    const { qty } = req.body;

    const productData = await book.findOne({ _id: productId });

    const total = productData.price * qty;
    const price = productData.price;

    const cartData = await cart.findOne({
      product_id: productId,
      user_id: userId,
    });

    if (cartData) {
      const updateQty = cartData.qty + 1;
      const updatePrice = price * updateQty;

      const updateCart = await cart.updateOne(
        { _id: cartData._id },
        {
          $set: {
            qty: updateQty,
            total: updatePrice,
          },
        }
      );

      return res.status(200).json({
        message: "Cart updated",
      });
    }

    const addCart = new cart({
      product_id: productId,
      price: price,
      qty,
      total: total,
      user_id: userId,
    });

    await addCart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Viwe Cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.decoded.id;

    const showCartData = await cart.find({ user_id: userId });

    if(!showCartData){
        return res.status(404).json({ 
            message: "Cart is Empty"
        })
    }

    return res.status(200).json({
        CartData: showCartData
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
