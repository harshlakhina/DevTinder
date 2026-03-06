import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { addUser } from "../Utils/userSlice";
import Toast from "./toast";

function EditProfile() {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [isToastActive,setIsToastActive]=useState(false);

  const dispatch = useDispatch();

  async function handleEditProfile() {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, gender, age, photoUrl },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      setIsToastActive(true);

      setTimeout(() => {
        setIsToastActive(false);
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
   <>
  {isToastActive &&  <Toast title="Edit Successfull!"/>}
    <div className={`flex justify-center gap-20 mt-14 ${isToastActive && "mt-20"}`}>
      <div className="flex justify-center">
        <div className="card w-80 bg-base-100 card-md shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile </h2>
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

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photourl:</legend>
              <input
                type="text"
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
                value={photoUrl}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About:</legend>
              <input
                type="text"
                className="input"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <div className="justify-center card-actions">
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, gender, about, age, photoUrl }} isbtns={false} />
    </div>
   </>
  );
}

export default EditProfile;
