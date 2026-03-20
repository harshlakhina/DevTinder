import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/contsants";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("lakhinaharsh123@gmail.com");
  const [password, setPassword] = useState("Harsh@123");

  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClickLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClickSignUp() {
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      setIsLogin((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center mt-14">
      <div className="card w-80 bg-base-100 card-md shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {!isLogin && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName:</legend>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName:</legend>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </fieldset>

              {/* <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID:</legend>
            <input
              type="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </fieldset>
           */}
            </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID:</legend>
            <input
              type="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="justify-center card-actions">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleClickLogin : handleClickSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <p>{isLogin ? "New User?" : "Existing User?"}</p>
              <p
                className="text-blue-800 cursor-pointer"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? "Sign Up here" : "Login here"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
