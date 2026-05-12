import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function Premium() {
  const payment = useSelector((state) => state.payment);

  async function handlePremium(type) {
    const res = await axios.post(
      BASE_URL + "/create-order",
      {
        memberShipType: type,
      },
      { withCredentials: true },
    );

    // navigate to session_url
    window.location.href = res.data.session_url;
  }
  return (
    <div className="bg-gradient-to-br from-[#F8F7FC] via-[#F3EEFF] to-[#EEE8FF] h-[79vh] flex justify-center items-center">
      {payment ? (
        <div className="flex gap-7 justify-center">
          <div className="card w-96  rounded-3xl bg-white border-2 border-[#DCCFFF] shadow-xl shadow-[#7C4DFF]/10 hover:shadow-2xl hover:-translate-y-1 hover:shadow-[#c7b8f0] hover:transition-all duration-300">
            <div className="card-body items-center">
                <div className="bg-[#7C4DFF] h-12 w-12 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols-light:star-outline-rounded" width={40} className="text-white"/>
              </div>
              <h2 className="card-title font-bold text-xl text-[#7C4DFF]">
                Silver MemberShip
              </h2>
              <ul className="list text-black">
                <li className="flex items-center gap-2 text-black">
                  <Icon
                    icon="mdi:chat-outline"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>Chat With Other People</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="fa7-solid:user-friends"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>100 Connection Requests per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="mdi:tick-circle"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>Blue Tick</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="uit:calender"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>3 Month</span>
                </li>
              </ul>
              <div className="card-actions">
                <button
                  className="btn  bg-[#F3EEFF] text-[#6C3CF0] border border-[#DCCFFF] hover:bg-[#E9E1FF]"
                  onClick={() => handlePremium("silver")}
                >
                  Buy Silver
                </button>
              </div>
            </div>
          </div>

          <div className="card rounded-3xl bg-[#FCFBFF] border-2 border-[#DCCFFF] shadow-xl shadow-[#7C4DFF]/15 w-96 hover:-translate-y-1 hover:shadow-[#c7b8f0] hover:transition-all duration-300">
            <div className="card-body items-center">
              <div className="bg-[#7C4DFF] h-12 w-12 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:crown-outline" width={25} className="text-white"/>
              </div>
              <h2 className="card-title font-bold text-xl text-[#7C4DFF]">
                Gold MemberShip
              </h2>

              <ul className="list text-black">
                <li className="flex items-center gap-2">
                  <Icon
                    icon="mdi:chat-outline"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>Chat With Other People</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="mdi:infinity"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span> infinite connection requests per/day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="mdi:tick-circle"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>Blue Tick</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    icon="uit:calender"
                    className="text-[#6C3CF0]"
                    width={16}
                  />
                  <span>6 Month</span>
                </li>
              </ul>
              <div className="card-actions">
                <button
                  className="btn btn-primary bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] text-white hover:from-[#6C3CF0] hover:to-[#4F2BE0] "
                  onClick={() => handlePremium("gold")}
                >
                  Buy Gold
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>You Already Have Premium</h1>
      )}
    </div>
  );
}

export default Premium;
