import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../Utils/contsants";
import { addFeed } from "../Utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

function Feed(){
  const dispatch=useDispatch();
  const {feed}=useSelector(state=>state);

  const getFeed=async()=>{
    if(feed) return ;
    const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
    dispatch(addFeed(res?.data?.users));
  }

  useEffect(()=>{
    getFeed();
  },[]);
  return (
    <div className="flex justify-center my-6">
      {feed && <UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed