import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";

function Chart() {
  const { targetId } = useParams();
  const user = useSelector((state) => state.user);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = user?._id;

  function handleSendMsg() {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, targetId, text: newMsg });
    setNewMsg("");
  }

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetId });

    socket.on("messageReceive", ({ text }) => {
      setMessages((messages) => [...messages, { text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  console.log(messages);
  return (
    <div className=" flex justify-center">
      <div className="border-2  w-1/2 h-90 flex-col items-center relative overflow-hidden">
        <div className="bg-black text-white h-10 ">hello</div>

        {messages.length > 0 && (
          <div className="chat chat-start">
            <div className="chat-bubble">
              {messages.map((msg, idx) => (
                <h1 key={idx}>{msg.text}</h1>
              ))}
            </div>
          </div>
        )}
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
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
