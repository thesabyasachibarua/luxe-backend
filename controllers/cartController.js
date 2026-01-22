const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name image price countInStock",
  );

  if (!cart) {
    // Create empty cart if doesn't exist
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  res.json(cart);
});

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty) {
    res.status(400);
    throw new Error("Product ID and quantity are required");
  }

  // Get product details
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check stock - DISABLED for unlimited stock
  // if (product.countInStock < qty) {
  //     res.status(400);
  //     throw new Error('Insufficient stock');
  // }

  // Find or create cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  // Check if item already in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].qty = qty;
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: qty,
    });
  }

  await cart.save();

  // Populate product details before returning
  cart = await Cart.findById(cart._id).populate(
    "items.product",
    "name image price countInStock",
  );

  res.json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Filter out the item
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId,
  );

  await cart.save();

  // Populate product details before returning
  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name image price countInStock",
  );

  res.json(updatedCart);
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  res.json({ message: "Cart cleared" });
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
