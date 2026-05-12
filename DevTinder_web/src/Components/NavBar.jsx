import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { removeUser } from "../Utils/userSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="navbar shadow-sm bg-white text-[#111827] border-b border-[#ECE8FF] sticky top-0 z-1">
        <div className="flex-1">
          <a href="/feed" className="btn btn-ghost text-xl ">
            <div className="flex">
              <span>Dev</span> <span className="text-[#7C4DFF]">Tinder</span>
            </div>
          </a>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <p>{`Welcome,${user.firstName}`}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-2"
              >
                <div className="w-10 rounded-full ">
                  <img alt="Logged in user" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow bg-white "
              >
                <li>
                  {" "}
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <a href="/connections">Connections</a>
                </li>
                <li>
                  {" "}
                  <a href="/requests">Requests</a>
                </li>

                <li>
                  <a href="/premium">Premium</a>
                </li>

                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
