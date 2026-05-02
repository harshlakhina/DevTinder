import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/contsants";
import { Icon } from "@iconify/react";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex justify-center items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] h-[90vh]">
      <div
        className={`w-80 h-fit bg-[#2B3C3B]/80 rounded-xl backdrop-blur-md shadow-sm`}
      >
        <div className="card-body">
          <h2 className="card-title justify-center text-[#EAF3F2] font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {!isLogin && (
            <>
              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend text-[#A7B8B6]">
                  FirstName:
                </legend>
                <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-[#7D8F8C]"
                  />
                  <input
                    type="text"
                    placeholder="FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className=" focus:border-[#72BFC0] outline-none text-[#7D8F8C] rounded-md"
                  />
                </div>
              </fieldset>

              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend text-[#A7B8B6]">
                  LastName:
                </legend>
                <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-[#7D8F8C]"
                  />
                  <input
                    type="text"
                    placeholder="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className=" focus:border-[#72BFC0] outline-none text-[#7D8F8C] rounded-md"
                  />
                </div>
              </fieldset>
            </>
          )}

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-[#A7B8B6]">
              Email ID:
            </legend>
            <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
              <Icon icon="mdi:email" width={20} className="text-[#7D8F8C]" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" focus:border-[#72BFC0] outline-none text-[#7D8F8C] rounded-md"
              />
            </div>
          </fieldset>

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-[#A7B8B6]">
              Password:
            </legend>
            <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
              <Icon icon="mdi:lock" width={20} className="text-[#7D8F8C]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" focus:border-[#72BFC0] outline-none text-[#7D8F8C] rounded-md"
              />
            </div>
          </fieldset>

          <div className="justify-center card-actions">
            <button
              className="btn bg-[#C46243] hover:bg-[#A84E36] text-white font-semibold px-6 py-2 rounded-lg shadow-md border-none"
              onClick={isLogin ? handleClickLogin : handleClickSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <p className="text-[#A7B8B6]">
                {isLogin ? "New User?" : "Existing User?"}
              </p>
              <p
                className="text-[#C46243] hover:text-[#A84E36] font-semibold cursor-pointer"
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
