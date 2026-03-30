const express = require("express");
const { userAuth } = require("../Middlewares/userAuth");
const { Chat } = require("../Models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetId", userAuth, async (req, res) => {
  const { targetId } = req.params;
  const userId = req.user._id;


  let chat =await Chat.findOne({
    participants: { $all: [userId, targetId] },
  }).populate({
    path:"messages.senderId",
    select:"firstName lastName"
  });

  if (!chat) {
    chat = new Chat({
      participants: [userId, targetId],
      messages: [{}],
    });
    await chat.save();
  }

  res.json({ chat });
});

module.exports = chatRouter;
