const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const msg = new Message({
    name,
    email,
    message,
  });

  const createdMessage = await msg.save();
  res.status(201).json(createdMessage);
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  await Message.deleteOne({ _id: req.params.id });
  res.json({ message: "Message removed" });
});

module.exports = { createMessage, getMessages, deleteMessage };
