import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequestById } from "../Utils/requestsSlice";
import { Link } from "react-router-dom";
import RequestsShimmer from "../shimmer/requestsShimmer";

function Requests() {
  const ConnectionRequests = useSelector((state) => state.requests);
  console.log(ConnectionRequests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (id, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequestById(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!ConnectionRequests) return <RequestsShimmer />;

  return (
    <div className="flex justify-center bg-gradient-to-br from-[#F8F7FC] via-[#F3EEFF] to-[#EEE8FF] min-h-[90vh] py-5">
      {ConnectionRequests.length > 0 ? (
        <div className="w-1/2 ">
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] bg-clip-text text-transparent">
              Connections Requests
            </h1>

            {ConnectionRequests &&
              ConnectionRequests.map((request) => {
                const { firstName, lastName, photoUrl, about, age, gender } =
                  request.fromUserId;
                return (
                  <li className="list-row bg-white border border-[#ECE8FF] shadow-lg shadow-[#7C4DFF]/10 hover:shadow-2xl hover:scale-[1.01] rounded-xl " key={request._id}>
                    <div>
                      <img className="size-10 rounded-box bg-[#F3EEFF] border border-[#DCCFFF]" src={photoUrl} />
                    </div>
                    <div>
                      <div className="text-[#111827]">{firstName + " " + lastName}</div>
                      {age && gender && (
                        <div className="text-xs uppercase font-semibold opacity-60 text-[#6B7280]">
                          {age + "," + gender}
                        </div>
                      )}
                    </div>
                    {about && <p className="list-col-wrap text-xs">{about}</p>}
                    <div className="flex gap-3 items-center">
                      <button
                        className="btn btn-primary btn-sm bg-[#F3EEFF] text-[#6C3CF0] border border-[#DCCFFF] hover:bg-[#E9E1FF]"
                        onClick={() => reviewRequest(request._id, "rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-sm bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] hover:from-[#6C3CF0] hover:to-[#4F2BE0] shadow-md shadow-[#7C4DFF]/30 text-white border-none"
                        onClick={() => reviewRequest(request._id, "accepted")}
                      >
                        Accept
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 justify-center text-black">
          <h1 className="text-4xl font-bold">No Requests Yet!</h1>
          <p className="text-[16px]">
            You don't have any connection requests right now.
          </p>
          <p className="text-[13px]">Check back later for new ones.</p>

          <Link
            className="bg-[#6C3CF0] text-white outline-none border-0 font-semibold cursor-pointer btn"
            to="/feed"
          >
            Explore Developers
          </Link>
        </div>
      )}
    </div>
  );
}

export default Requests;
