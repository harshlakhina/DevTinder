import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils/contsants";
import { addFeed } from "../Utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./userCard";
import { motion, AnimatePresence } from "motion/react";

function Feed() {
  const dispatch = useDispatch();
  const exitCardAnimation = useRef(null);
  const { feed } = useSelector((state) => state);

  const getFeed = async () => {
    if (feed.length) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    console.log(res.data.users);
    dispatch(addFeed(res?.data?.users));
  };

  useEffect(() => {
    getFeed();
  }, []);

  function handleUserCardExit(type) {
    exitCardAnimation.current = type;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] min-h-[79vh]  py-2">
      <AnimatePresence mode="wait">
        {feed.length > 0 && (
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
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feed;
