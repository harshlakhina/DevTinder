import { useEffect } from "react";
import { createSocketConnection } from "../Utils/socket";

function Chart() {
  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("");
  }, []);
  return (
    <div className=" flex justify-center">
      <div className="border-2  w-1/2 h-90 flex-col items-center relative overflow-hidden">
        <div className="bg-black text-white h-10 ">hello</div>

        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
        <div className="flex absolute bottom-0 w-full">
          <div className="w-full">
            <label className="input w-full outline-0">
              <input type="text" placeholder="Enter Your Message" />
            </label>
          </div>
          <button className="btn btn-neutral outline-0 ">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
