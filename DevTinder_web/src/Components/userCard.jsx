import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../Utils/feedSlice";

function UserCard({ user }) {
  const {_id,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch=useDispatch();

  const sendRequest=async(status,id)=>{
    const res=await axios.post(`${BASE_URL}/request/send/${status}/${id}`,{},{withCredentials:true});
    console.log(res);
    dispatch(removeFeedById(_id))

  }
  return (
    <div className="card bg-base-300 w-90 shadow-sm ">
      <figure>
        <img src={photoUrl} alt="photo" className="h-70" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {about && <p>{about}</p>}
        {age && gender && <p>{age + "," + gender}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={()=>sendRequest("ignored",_id)}> Ignored</button>
          <button className="btn btn-secondary" onClick={()=>sendRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
