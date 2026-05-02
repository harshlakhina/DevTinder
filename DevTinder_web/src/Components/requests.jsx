import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequestById } from "../Utils/requestsSlice";

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

  return (
    <div className="flex justify-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] min-h-[90vh] py-5">
      <div className="w-1/2 ">
        <ul className="list flex flex-col gap-5">
          {ConnectionRequests.length > 0 ? (
            <h1 className="text-center text-2xl font-bold text-white">
              Connections Requests
            </h1>
          ) : (
            <h1 className="text-center text-xl font-bold">No Requets found</h1>
          )}

          {ConnectionRequests &&
            ConnectionRequests.map((request) => {
              const { firstName, lastName, photoUrl, about, age, gender } =
                request.fromUserId;
              return (
                <li className="list-row bg-[#2B3C3B]/80 " key={request._id}>
                  <div>
                    <img className="size-10 rounded-box" src={photoUrl} />
                  </div>
                  <div>
                    <div>{firstName + " " + lastName}</div>
                    {age && gender && (
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {age + "," + gender}
                      </div>
                    )}
                  </div>
                  {about && <p className="list-col-wrap text-xs">{about}</p>}

                  <div className="flex gap-3 items-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => reviewRequest(request._id, "rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
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
    </div>
  );
}

export default Requests;
