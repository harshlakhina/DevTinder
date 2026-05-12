import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../Utils/feedSlice";
import { Icon } from "@iconify/react";

function UserCard({
  user,
  handleUserCardExit,
  isInterestedDisabled,
  setIsInterestedDisabled,
  isIgnoredDisabled,
  setIsIgnoredDisabled,
}) {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const sendRequest = async (status, id) => {
    setIsInterestedDisabled(true);
    setIsIgnoredDisabled(true);

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
    } finally {
      setIsInterestedDisabled(false);
      setIsIgnoredDisabled(false);
    }
  };
  return (
    <div className="w-90 bg-white backdrop-blur-xl border border-[#EEE9FF] shadow-2xl shadow-[#7C4DFF]/10   flex flex-col items-center gap-4 rounded-2xl">
      <img
        src={photoUrl}
        alt="photo"
        className="h-38 w-38 rounded-full  bg-[#F3EEFF] border-4 border-[#7C4DFF] mt-3 object-cover"
      />
      <div className="flex flex-col items-center gap-1">
        <p className="text-[#111827] font-bold text-xl">
          {firstName + " " + lastName}
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <Icon icon="uil:calender" className="text-[#6C3CF0]" />
            <p className="text-[#111827]">{`Age : ${age}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="iconamoon:profile-fill" className="text-[#6C3CF0]" />
            <p className="text-[#111827]">{`Gender : ${gender}`}</p>
          </div>
        </div>
      </div>

      <p className="text-[#111827]  text-[14px] text-center px-6">{about}</p>

      <div className="flex gap-2 flex-wrap px-6 justify-center">
        <p className="px-4 py-1.5 rounded-full  border border-[#DCCFFF] bg-[#F8F5FF] text-[#111827] text-sm hover:bg-[#7C4DFF] hover:text-white transition">
          React
        </p>
        <p className="px-4 py-1.5 rounded-full  border border-[#DCCFFF] bg-[#F8F5FF] text-[#111827] text-sm hover:bg-[#7C4DFF] hover:text-white transition">
          Java
        </p>
        <p className="px-4 py-1.5 rounded-full  border border-[#DCCFFF] bg-[#F8F5FF] text-[#111827] text-sm hover:bg-[#7C4DFF] hover:text-white transition">
          C++
        </p>
        <p className="px-4 py-1.5 rounded-full  border border-[#DCCFFF] bg-[#F8F5FF] text-[#111827] text-sm hover:bg-[#7C4DFF] hover:text-white transition">
          python
        </p>
        <p className="px-4 py-1.5 rounded-full  border border-[#DCCFFF] bg-[#F8F5FF] text-[#111827] text-sm hover:bg-[#7C4DFF] hover:text-white transition">
          DBMS
        </p>
      </div>

      <div className=" flex w-full p-4 rounded-b-2xl justify-between ">
        <button
          className="flex items-center border border-[#7C4DFF] text-[#6C3CF0] bg-white hover:bg-[#F3EEFF] py-2 px-8 rounded-[8px] cursor-pointer"
          onClick={() => sendRequest("ignored", _id)}
          disabled={isIgnoredDisabled}
        >
          <Icon icon="jam:close" className="text-xl" />
          <p>Ignore</p>
        </button>
        <button
          className="flex items-center gap-1 bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] hover:from-[#6C3CF0] hover:to-[#4F2BE0] text-white py-2 px-6 rounded-[8px] cursor-pointer"
          onClick={() => sendRequest("interested", _id)}
          disabled={isInterestedDisabled}
        >
          <Icon icon="mdi:heart" className=" text-xl" />
          <p>Interested</p>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
