import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

function RootLayout() {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const fetchUser = async () => {
    console.log("fetchuser")
    try {
      const res = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true
      });
      console.log("user",res.data)
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
     if(err.status==401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout;
