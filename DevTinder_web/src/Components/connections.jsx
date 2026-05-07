import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";
import { Link } from "react-router-dom";

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

  return (
    <div className="flex justify-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] min-h-[90vh] py-5">
      {connections.length > 0 ? (
        <div className="w-1/2 ">
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold text-white">
              Connections
            </h1>
            {connections &&
              connections.map((connection) => {
                return (
                  <li
                    className="list-row bg-[#2B3C3B]/80 "
                    key={connection._id}
                  >
                    <div>
                      <img
                        className="size-10 rounded-box"
                        src={connection.photoUrl}
                      />
                    </div>
                    <div>
                      <div className="text-white">
                        {connection.firstName + " " + connection.lastName}
                      </div>
                      {connection.age && connection.gender && (
                        <div className="text-xs uppercase font-semibold opacity-60">
                          {connection.age + "," + connection.gender}
                        </div>
                      )}
                    </div>
                    {connection.about && (
                      <p className="list-col-wrap text-xs">
                        {connection.about}
                      </p>
                    )}

                    <Link to={"/chat/" + connection._id}>
                      <button className="btn bg-orange-500 hover:bg-orange-600 text-white">
                        Chat
                      </button>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 justify-center ">
          <h1 className="text-4xl font-bold">No Connections found</h1>
          <p className="text-[18px]">You haven't connected with anyone yet.</p>
          <p className="text-[15px]">
            Start Exploring and connect with awesome!
          </p>

          <Link
            className="bg-[#C46243] outline-none border-0 font-semibold cursor-pointer btn"
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
