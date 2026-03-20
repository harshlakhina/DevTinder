const express = require("express");
const { userAuth } = require("../Middlewares/userAuth");
const { addMonths } = require("date-fns");

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
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failure",
      payment_intent_data: {
        metadata: {
          email: loggedInUser.emailId,
          userId: String(loggedInUser._id),
          memberShipType,
        },
      },
    });

    return res.json({ session_url: session.url });
  } catch (err) {
    res.status(500).send({ message: "failed to make payment session" });
  }
});

paymentRouter.post("/webhook", async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.rawBody,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case "payment_intent.succeeded": {
        const stripeCustomerId = event.data.object.customer;

        const user = await User.findOne({ stripeCustomerId });
        console.log("user", user);
        user.isPremium = true;

        if (event.data.object.metadata.memberShipType === "gold") {
          const expiryDate = addMonths(new Date(), 6);
          console.log("expiryDateGold", expiryDate);
          user.premiumExpiredAt = expiryDate;
        }
        if (event.data.object.metadata.memberShipType === "silver") {
          const expiryDate = addMonths(new Date(), 3);
          console.log("expiryDateSilver", expiryDate);
          user.premiumExpiredAt = expiryDate;
        }

        await user.save();
        console.log(user);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
module.exports = paymentRouter;
