import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice"
import feedReducer from "../Utils/feedSlice"
import connectionReducer from "../Utils/connectionSlice"
import requestsReducer from "../Utils/requestsSlice"

const appStore=configureStore({
   reducer:{
    user:userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestsReducer
   }
})

export default appStore