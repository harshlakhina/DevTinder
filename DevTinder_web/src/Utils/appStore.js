import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice"
import feedReducer from "../Utils/feedSlice"

const appStore=configureStore({
   reducer:{
    user:userReducer,
    feed:feedReducer
   }
})

export default appStore