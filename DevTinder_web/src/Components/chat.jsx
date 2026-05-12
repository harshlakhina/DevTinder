import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { Icon } from "@iconify/react";

function Chart() {
  const { targetId } = useParams();
  const user = useSelector((state) => state.user);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = user?._id;

  function handleSendMsg() {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetId,
      text: newMsg,
      firstName: user.firstName,
      lastName: user.lastName,
    });
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

    socket.on("messageReceive", ({ text, userId, firstName, lastName }) => {
      setMessages((messages) => [
        ...messages,
        { text, userId, firstName, lastName },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  useEffect(() => {
    getPreviousChat();
  }, []);

  return (
    <div className="flex justify-center bg-gradient-to-br from-[#F8F7FC] via-[#F3EEFF] to-[#EEE8FF]">
      <div className="w-1/2 max-h-116 min-h-116 my-4 relative overflow-hidden  backdrop-blur-md shadow-2xl shadow-black/40 ">
        <div className="text-white bg-white border border-[#ECE8FF] shadow-2xl shadow-[#7C4DFF]/10  flex justify-center h-10 items-center gap-1">
          <Icon icon="mdi:chat-outline" className=" text-2xl text-[#7C4DFF]" />
          <p className="text-[#111827] font-bold text-xl">chat</p>
        </div>

        <div className="overflow-y-auto h-full pb-30 bg-[#FCFBFF] border-b border-[#ECE8FF]">
          {messages.length > 0 &&
            messages.map((msg, idx) => {
              return (
                <div
                  className={`chat ${userId.toString() === msg.userId.toString() ? "chat-end" : "chat-start"}`}
                  key={idx}
                >
                  <div className="chat-header text-[#111827]">
                    {msg.firstName + " " + msg.lastName}
                  </div>
                  <div className="chat-bubble bg-[#7C4DFF] text-white break-all ">
                    {msg.text}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="fixed bottom-0 w-full bg-white border-t-black border">
          <div className="flex w-full p-3 gap-2">
            <div className="w-full">
              <label className=" input border-2 w-full outline-0 bg-white border-2 border-gray-400">
                <input
                  type="text"
                  placeholder="Enter Your Message"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="bg-white text-black "
                />
              </label>
            </div>
            <button
              className="btn btn-neutral outline-0 border-0 bg-[#7C4DFF] text-white hover:bg-[#9068fc] flex items-center"
              onClick={handleSendMsg}
            >
              <Icon icon="tabler:send" width={20} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
