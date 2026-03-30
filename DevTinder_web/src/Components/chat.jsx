import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";

function Chart() {
  const { targetId } = useParams();
  const user = useSelector((state) => state.user);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = user?._id;

  function handleSendMsg() {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, targetId, text: newMsg,firstName:user.firstName,lastName:user.lastName });
    setNewMsg("");
  }

  async function getPreviousChat() {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      const prevMessages = res?.data?.chat?.messages?.map((msg) => {
        return {
          text: msg.text,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          userId: msg.senderId._id,
        };
      });

      setMessages(prevMessages);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetId });

    socket.on("messageReceive", ({ text ,userId,firstName,lastName}) => {
      setMessages((messages) => [...messages, { text,userId,firstName,lastName }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  useEffect(() => {
    getPreviousChat();
  }, []);


  return (
    <div className="flex justify-center">
      <div className="border-2  w-1/2 h-96 relative overflow-hidden">
        <div className="bg-black text-white h-10 text-center ">Chat</div>

        <div className="overflow-y-auto h-full pb-20">
          {messages.length > 0 &&
            messages.map((msg, idx) => {
              return (
                <div
                  className={`chat ${userId.toString() === msg.userId.toString() ? "chat-end" : "chat-start"}`}
                  key={idx}
                >
                  <div className="chat-header">
                    {msg.firstName + " " + msg.lastName}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              );
            })}
        </div>

        <div className="flex absolute bottom-0 w-full">
          <div className="w-full">
            <label className="input w-full outline-0">
              <input
                type="text"
                placeholder="Enter Your Message"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
            </label>
          </div>
          <button className="btn btn-neutral outline-0" onClick={handleSendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
