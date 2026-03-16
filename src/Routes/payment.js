const express = require("express");
const { userAuth } = require("../Middlewares/userAuth");

const paymentRouter = express.Router();
const stripeClient = require("../Utils/stripe");

const { memberShipPriceId } = require("../Utils/constants");
const User = require("../Models/User");

paymentRouter.post("/create-order", userAuth, async (req, res) => {
  const memberShipType = req.body?.memberShipType;
  if (!memberShipType) {
    return res.status(400).json({ message: "memebership type is required" });
  }
  const loggedInUser = req.user;

  // stripe customer creation
  const user = await User.findById(loggedInUser._id);

  // only create customer on stripe when user is new or have no stripeCusotmerId in DB
  if (!user.stripeCustomerId) {
    const customer = await stripeClient.customers.create({
      email: loggedInUser.email,
    });
    const cutomerId = customer.id;
    user.stripeCustomerId = cutomerId;
    await user.save();
  }

  const priceId =
    memberShipType === "silver"
      ? memberShipPriceId.silver
      : memberShipPriceId.gold;

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://www.google.com",
      metadata: {
        email: loggedInUser.emailId,
        userId: String(loggedInUser._id),
      },
    });

    return res.json({ session_url: session.url });
  } catch (err) {
    res.status(500).send({ message: "failed to make payment session" });
  }
});

module.exports = paymentRouter;
