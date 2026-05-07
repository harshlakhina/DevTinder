import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils/contsants";
import { addFeed } from "../Utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./userCard";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

function Feed() {
  const dispatch = useDispatch();
  const exitCardAnimation = useRef(null);
  const { feed } = useSelector((state) => state);

  const getFeed = async () => {
    if (feed.length) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    console.log(res.data.users);
    if (res.data.users.length != 0) dispatch(addFeed(res?.data?.users));
  };

  useEffect(() => {
    if (feed.length == 0) getFeed();
  }, [feed]);

  function handleUserCardExit(type) {
    exitCardAnimation.current = type;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] min-h-[79vh]  py-2">
      <AnimatePresence mode="wait">
        {feed.length > 0 ? (
          <motion.div
            key={feed[0]._id}
            custom={exitCardAnimation}
            initial={{ opacity: 0, scale: 0.2, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={(direction) => ({
              opacity: 0,
              x: direction.current === "interested" ? 300 : -300,
              rotate: direction.current === "interested" ? 15 : -15,
              scale: 0.8,
            })}
            transition={{ duration: 0.45 }}
          >
            <UserCard
              user={feed[0]}
              isbtns={true}
              handleUserCardExit={handleUserCardExit}
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">You're all caught up!</h1>
            <p className="text-[18px]">No more developers profile to show.</p>
            <p className="text-[17px]">Check back later</p>

            <button
              className="bg-[#C46243] outline-none border-0 font-semibold cursor-pointer btn"
              onClick={() => window.location.reload()}
            >
              <Icon icon="material-symbols-light:refresh" width={22} />
              <p>Refresh</p>
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feed;
