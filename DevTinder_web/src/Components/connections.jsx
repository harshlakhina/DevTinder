import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";
import { Link } from "react-router-dom";
import ConnectionsShimmer from "../shimmer/connectionShimmer";

function Connections() {
  const connections = useSelector((state) => state.connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <ConnectionsShimmer />;

  return (
    <div className="flex justify-center bg-gradient-to-br from-[#F8F7FC] via-[#F3EEFF] to-[#EEE8FF] min-h-[90vh] py-5">
      {connections.length > 0 ? (
        <div className="w-1/2 ">
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] bg-clip-text text-transparent">
              Connections
            </h1>
            {connections &&
              connections.map((connection) => {
                return (
                  <li
                    className="list-row bg-white border border-[#ECE8FF] shadow-lg shadow-[#7C4DFF]/10 hover:shadow-2xl hover:scale-[1.01]"
                    key={connection._id}
                  >
                    <div>
                      <img
                        className="size-10 rounded-box bg-[#F3EEFF] border border-[#DCCFFF]"
                        src={connection.photoUrl}
                      />
                    </div>
                    <div>
                      <div className="text-[#1F2937]">
                        {connection.firstName + " " + connection.lastName}
                      </div>
                      {connection.age && connection.gender && (
                        <div className="text-xs uppercase font-semibold opacity-60 text-[#6B7280]">
                          {connection.age + "," + connection.gender}
                        </div>
                      )}
                    </div>
                    {connection.about && (
                      <p className="list-col-wrap text-xs text-[#6B7280]">
                        {connection.about}
                      </p>
                    )}

                    <Link to={"/chat/" + connection._id}>
                      <button className="btn bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] hover:from-[#6C3CF0] hover:to-[#4F2BE0] shadow-md shadow-[#7C4DFF]/30 text-white">
                        Chat
                      </button>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 justify-center text-black">
          <h1 className="text-4xl font-bold">No Connections found</h1>
          <p className="text-[18px]">You haven't connected with anyone yet.</p>
          <p className="text-[15px]">
            Start Exploring and connect with awesome!
          </p>

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

export default Connections;
