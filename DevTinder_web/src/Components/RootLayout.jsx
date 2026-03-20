import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { isPremium } from "../Utils/verifyPaymentSlice";

function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) navigate("/login");
    }
  };

  const verifyPayment = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment-verify", {
        withCredentials: true,
      });

      dispatch(isPremium(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    verifyPayment();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
