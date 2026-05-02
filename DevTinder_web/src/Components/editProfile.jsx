import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { addUser } from "../Utils/userSlice";
import Toast from "./toast";
import { Icon } from "@iconify/react";

function EditProfile() {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isTipActive, setIsTipActive] = useState(true);

  function handleTipVisibility() {
    setIsTipActive(false);
  }

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

  function handelCancelBtn() {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAbout(user.about);
    setGender(user.gender);
    setAge(user.age);
    setPhotoUrl(user.photoUrl); 
  }

  return (
    <>
      {isToastActive && <Toast title="Edit Successfull!" />}

      <div className="flex flex-col items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7]">
        <div className={`flex gap-20 my-2 ${isToastActive && "mt-20"}`}>
          <div className="flex justify-center ">
            <div className="card w-100  card-md shadow-sm">
              <div className="card-body bg-slate-800/60 rounded-xl">
                <div className="flex gap-3 items-center">
                  <div className="bg-[#2D7B6B] h-9 w-9 rounded-full flex justify-center items-center">
                    <Icon
                      icon="iconamoon:profile-fill"
                      width={20}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h2 className="card-title font-bold">Edit Profile </h2>
                    <p className="text-[11px]">
                      Update your details and how others see you
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="iconamoon:profile-fill"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">FirstName:</legend>
                    <input
                      type="text"
                      className="input input-sm"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </fieldset>
                </div>

                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="iconamoon:profile-fill"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">LastName:</legend>
                    <input
                      type="text"
                      className="input input-sm"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </fieldset>
                </div>

                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="line-md:link"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Photourl:</legend>
                    <input
                      type="text"
                      className="input input-sm"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      value={photoUrl}
                    />
                  </fieldset>
                </div>

                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="material-symbols:docs"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">About:</legend>
                    <input
                      type="text"
                      className="input input-sm"
                      onChange={(e) => setAbout(e.target.value)}
                      value={about}
                    />
                  </fieldset>
                </div>

                <div className="flex gap-3">
                  <div className="flex gap-2 items-end w-full">
                    <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                      <Icon
                        icon="uil:calender"
                        width={16}
                        className="text-white"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Age</legend>
                      <input
                        type="number"
                        className="input input-sm"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </fieldset>
                  </div>

                  <div className="flex gap-2 items-end w-full">
                    <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                      <Icon
                        icon="foundation:torsos-male-female"
                        width={16}
                        className="text-white"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Gender</legend>
                      <input
                        type="text"
                        className="input input-sm"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </fieldset>
                  </div>
                </div>

                <div className="justify-between card-actions mt-2">
                  <button className="btn btn-primary" onClick={handelCancelBtn}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleEditProfile}
                  >
                    <Icon
                      icon="material-symbols:save-outline-rounded"
                      width={16}
                      className="text-white"
                    />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-slate-800/60 w-100 rounded-xl p-3 flex flex-col gap-2">
            <div className="h-1/2 flex flex-col gap-4">
              <div className="text-[#8B5CF6] flex gap-2 items-center">
                <Icon icon="iconoir:eye" width={20} />
                <p>Profile Preview</p>
              </div>

              <div className="flex justify-center">
                <img
                  src={
                    photoUrl
                      ? photoUrl
                      : "https://www.gravatar.com/avatar/?d=mp&s=200"
                  }
                  className="rounded-full  ring-purple-600 shadow-[0_0_10px_rgba(124,58,237,0.5)] h-36 w-36 object-cover"
                  alt="avatar"
                  // style={{
                  //   objectFit: "cover",
                  // }}
                />
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-[14px]">{firstName + lastName}</p>
                  <p className="text-[12px]">{user.emailId}</p>
                </div>
              </div>
            </div>
            <hr style={{ color: "#2E2B4A" }} />
            <div className="h-1/2 flex flex-col gap-3">
              <div className="flex gap-3 p-3 items-center bg-[#1E1C30] border-2 border-[#2E2B4A]">
                <div className="bg-[#2A2745] h-8 w-8 mb-1 rounded-[5px] flex justify-center items-center">
                  <Icon
                    icon="material-symbols:docs"
                    width={16}
                    className="text-[#8B5CF6]"
                  />
                </div>

                <div>
                  <p className="text-[14px]">About</p>
                  <p className="text-[12px]">
                    {!about ? "not specified" : about}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-3 items-center bg-[#1E1C30] border-2 border-[#2E2B4A]">
                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2A2745] h-8 w-8 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="uil:calender"
                      width={16}
                      className="text-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px]">Age</p>
                    <p className="text-[12px]">
                      {!age ? "not specified" : age}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-end w-full">
                  <div className="bg-[#2A2745] h-8 w-8 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="foundation:torsos-male-female"
                      width={16}
                      className="text-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px]">Gender</p>
                    <p className="text-[12px]">
                      {!gender ? "not specified" : gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isTipActive && (
          <div className="card bg-slate-800/60 w-220 shadow-sm mb-3">
            <div className=" flex justify-between p-4 ">
              <div className="flex items-center gap-2">
                <div className="bg-[#2D7B6B] h-10 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                  <Icon icon="icons8:idea" style={{ height: 25, width: 25 }} />
                </div>
                <div>
                  <p className="text-[#2D7B6B] font-bold">Tip</p>
                  <p>
                    A complete Profile helps other know you better. Add a photo
                    and write something about yourself!
                  </p>
                </div>
              </div>
              <div>
                <Icon
                  icon="charm:cross"
                  style={{
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={handleTipVisibility}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
