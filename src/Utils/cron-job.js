const corneJob = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../Models/ConnectionRequest");
const sendMail = require("./mail");

corneJob.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const yesterdayPendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gt: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const uniqueReceiverEmails = [
      ...new Set(
        yesterdayPendingRequests.map((request) => request.toUserId.emailId),
      ),
    ];

    for (email of uniqueReceiverEmails) {
      try {
        await sendMail(
          email,
          "Yesterday's Pending Requests",
          "Dear User,This is a reminder that you have pending requests from yesterday that require your attention.Please review them at your earliest convenience and take the necessary action by either accepting or rejecting the requests",
        );
      } catch (err) {
        console.lo(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
