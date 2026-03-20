import axios from "axios";
import { BASE_URL } from "../Utils/contsants";

function Premium() {
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
    <div className="flex gap-7 justify-center mt-8">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center">
          <h2 className="card-title font-bold text-xl">Silver MemberShip</h2>
          <ul className="list">
            <li>Chat With Other People</li>
            <li>100 Connection Requests per day</li>
            <li>Blue Tick</li>
            <li>3 Month</li>
          </ul>
          <div className="card-actions">
            <button
              className="btn btn-secondary"
              onClick={() => handlePremium("silver")}
            >
              Buy Silver
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center">
          <h2 className="card-title font-bold text-xl">Gold MemberShip</h2>
          <ul className="list">
            <li>Chat With Other People</li>
            <li>infinite connection requets per/day</li>
            <li>Blue Tick</li>
            <li>6 Month</li>
          </ul>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handlePremium("gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
