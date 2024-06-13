const cart = require("../models/cart");
const order = require("../models/order");
const user = require("../models/user");
const book = require("../models/book");
const mailer = require("../helpers/mailer");

// Cart Order
exports.cartOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const id = req.params.id;

    const cartItems = await cart.find({ user_id: userId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.total,
      0
    );

    const Order = new order({
      user_id: userId,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        price: item.price,
        qty: item.qty,
        total: item.total,
      })),
      totalAmount: totalAmount,
    });

    await Order.save();

    // Clear user's cart
    await cart.deleteMany({ user_id: userId });

    return res.status(200).json({
      message: "Order placed successfully",
      Order: Order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Place Single Order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.decoded.id; // Assuming the user ID is decoded from a JWT token
    const { items } = req.body; // Assuming items is an array of { product_id, qty }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order." });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await book.findById(item.product_id);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${item.product_id} not found.` });
      }

      const total = product.price * item.qty;
      totalAmount += total;

      orderItems.push({
        product_id: item.product_id,
        price: product.price,
        qty: item.qty,
        total: total,
      });
    }

    const Order = new order({
      user_id: userId,
      items: orderItems,
      totalAmount: totalAmount
    });

    const userDetail = await user.findById(Order.user_id);
    const email = userDetail.email

    const msg =
        "<p> Hii <b>" +
  userDetail.name + '</b>, your Order has been place successfully.</p>';
  
    mailer.sendMail(email,"Order Placed", msg);
    await Order.save();

    return res.status(200).json({
      message: "Order placed successfully",
      Order: Order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Order
exports.viewOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;

    const getOrder = await order.find({ user_id: userId }).populate('items.product_id');
    
    if(!getOrder || getOrder.length === 0) {
      return res.status(404).json({ 
        message: "Empty order"
      })
    }

    return res.status(200).json({
      MyOrder: getOrder
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}