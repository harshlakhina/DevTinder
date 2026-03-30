const socket = require("socket.io");
const crypto = require("crypto");
const {Chat}=require("../Models/chat");

function generateRoomId(userId, targetId) {
  const sortedIds = [userId, targetId].sort().join("_");
  return crypto.createHash("sha256").update(sortedIds).digest("hex");
}

function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetId }) => {
      const roomId = generateRoomId(userId, targetId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async({ userId, targetId, text,firstName,lastName }) => {
      try {
        const roomId = generateRoomId(userId, targetId);
        let chat=await Chat.findOne({
          participants:{$all:[userId,targetId]}
        })

        if(!chat){
          chat=new Chat({
            participants:[userId,targetId],
            messages:[]
          });
        }

        chat.messages.push({
          senderId:userId,
          text
        })

        await chat.save();

        io.to(roomId).emit("messageReceive", { text,userId ,firstName,lastName});
      } catch (err) {
        console.log(err);
      }
    });
  });
}

module.exports = initializeSocket;
