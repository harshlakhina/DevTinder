import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../Utils/feedSlice";
import { Icon } from "@iconify/react";

function UserCard({ user, isbtns, handleUserCardExit }) {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const sendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      console.log(res);
      handleUserCardExit(status);
      dispatch(removeFeedById(_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
 

    <div className="w-90  bg-slate-800/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-teal-500/20 flex flex-col items-center gap-4 rounded-2xl">
      <img
        src={photoUrl}
        alt="photo"
        className="h-38 w-38 rounded-full  border-4 border-teal-600 mt-3 object-cover"
      />
      <div className="flex flex-col items-center gap-1">
        <p className="text-white/60 font-bold text-xl">
          {firstName + " " + lastName}
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <Icon icon="uil:calender" className="text-teal-300" />
            <p className="text-white/60">{`Age : ${age}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="iconamoon:profile-fill" className="text-teal-300" />
            <p className="text-white/60">{`Gender : ${gender}`}</p>
          </div>
        </div>
      </div>

      <p className="text-white/60  text-[14px] text-center px-6">{about}</p>

      <div className="flex gap-2 flex-wrap px-6 justify-center">
        <p className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-sm hover:bg-teal-400/10 hover:border-teal-300 transition">
          React
        </p>
        <p className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-sm hover:bg-teal-400/10 hover:border-teal-300 transition">
          JS
        </p>
        <p className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-sm hover:bg-teal-400/10 hover:border-teal-300 transition">
          Node
        </p>
        <p className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-sm hover:bg-teal-400/10 hover:border-teal-300 transition">
          Mongo DB
        </p>
        <p className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-sm hover:bg-teal-400/10 hover:border-teal-300 transition">
          AI
        </p>
      </div>

      <div className="bg-slate-900/40 text-white/60 flex w-full p-4 rounded-b-2xl justify-between ">
        <button
          className="flex items-center border border-indigo-500 text-white bg-indigo-500/20 hover:bg-indigo-800/20 py-2 px-8 rounded-[8px] cursor-pointer"
          onClick={() => sendRequest("ignored", _id)}
        >
          <Icon icon="jam:close" className="text-white text-xl" />
          <p>Ignore</p>
        </button>
        <button
          className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white py-2 px-6 rounded-[8px] cursor-pointer"
          onClick={() => sendRequest("interested", _id)}
        >
          <Icon icon="mdi:heart" className="text-white text-xl" />
          <p>Interested</p>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
