import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/contsants";
import { addUser } from "../Utils/userSlice";
import Toast from "./toast";
import { Icon } from "@iconify/react";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../Hook/rhf-textfield";
import RHFTextArea from "../Hook/rhf-textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateProfileSchema } from "../schema/validators";

function EditProfile() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const methods = useForm({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
    },
  });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;
  const photoUrl = watch("photoUrl");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const about = watch("about");
  const age = watch("age");
  const gender = watch("gender");

  const [isToastActive, setIsToastActive] = useState(false);
  const [isTipActive, setIsTipActive] = useState(true);

  function handleTipVisibility() {
    setIsTipActive(false);
  }

  const dispatch = useDispatch();

  async function handleEditProfile(data) {
    const { firstName, lastName, about, gender, age, photoUrl } = data;
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
    reset();
  }

  const onSubmit = (data) => {
    console.log(data);
    handleEditProfile(data);
  };

  const handleFormErrors = (msg) => (
    <span className="text-red-600 text-[14px]">{msg}</span>
  );

  return (
    <>
      {isToastActive && <Toast title="Edit Successfull!" />}

      <FormProvider {...methods}>
        <div className="flex flex-col items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7]">
          <div className={`flex gap-20 my-2 ${isToastActive && "mt-20"}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                    <div
                      className={`flex gap-2 ${errors?.firstName ? "items-center" : "items-end"} w-full`}
                    >
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="iconamoon:profile-fill"
                          width={16}
                          className="text-white"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-2">
                        <fieldset className="fieldset p-0 w-full">
                          <p>FirstName:</p>
                          <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                            <RHFTextField
                              name="firstName"
                              placeholder="FirstName"
                            />
                          </div>
                        </fieldset>
                        {errors?.firstName &&
                          handleFormErrors(errors?.firstName?.message)}
                      </div>
                    </div>

                    <div
                      className={`flex gap-2 ${errors.lastName ? "items-center" : "items-end"} w-full`}
                    >
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="iconamoon:profile-fill"
                          width={16}
                          className="text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <fieldset className="fieldset p-0 w-full">
                          <p>LastName:</p>
                          <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                            <RHFTextField
                              name="lastName"
                              placeholder="LastName"
                            />
                          </div>
                        </fieldset>
                        {errors?.lastName &&
                          handleFormErrors(errors?.lastName?.message)}
                      </div>
                    </div>

                    <div className="flex gap-2 items-end w-full">
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="line-md:link"
                          width={16}
                          className="text-white"
                        />
                      </div>
                      <fieldset className="fieldset p-0 w-full">
                        <p>PhotoUrl:</p>
                        <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                          <RHFTextField
                            name="photoUrl"
                            placeholder="PhotoUrl"
                          />
                        </div>
                      </fieldset>
                    </div>

                    <div className={`flex w-full gap-2 items-center`}>
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="material-symbols:docs"
                          width={16}
                          className="text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <fieldset className="fieldset p-0 w-full">
                          <p>About:</p>
                          <div className="flex  bg-[#202C2C] border-[#3E5A5A] border w-full p-2 gap-2">
                            <Icon
                              icon="mdi:pencil"
                              width={20}
                              className="text-[#7D8F8C]"
                            />

                            <RHFTextArea
                              name="about"
                              placeholder="Tell us about yourself..."
                              className="w-full min-h-10 outline-none"
                            />
                          </div>
                        </fieldset>
                        {errors?.about &&
                          handleFormErrors(errors?.about?.message)}
                      </div>
                    </div>

                    <div
                      className={`flex gap-2 ${errors?.age ? "items-center" : "items-end"} w-full`}
                    >
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="uil:calender"
                          width={16}
                          className="text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <fieldset className="fieldset p-0 w-full">
                          <p>Age:</p>
                          <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                            <RHFTextField name="age" placeholder="Age" />
                          </div>
                        </fieldset>
                        {errors?.age && handleFormErrors(errors?.age?.message)}
                      </div>
                    </div>

                    <div
                      className={`flex gap-2 w-full ${errors?.gender ? "items-center" : "items-end"}`}
                    >
                      <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                        <Icon
                          icon="foundation:torsos-male-female"
                          width={16}
                          className="text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <fieldset className="fieldset p-0 w-full">
                          <p>Gender:</p>
                          <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                            <RHFTextField name="gender" placeholder="Gender" />
                          </div>
                        </fieldset>
                        {errors?.gender &&
                          handleFormErrors(errors?.gender?.message)}
                      </div>
                    </div>

                    <div className="justify-between card-actions mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={handelCancelBtn}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary">
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
            </form>

            <div className="bg-slate-800/60 w-100 rounded-xl p-3 flex flex-col gap-2">
              <div className="h-1/2 flex flex-col gap-4">
                <div className="text-[#05201b] flex gap-2 items-center">
                  <Icon icon="iconoir:eye" width={20} />
                  <p>Profile Preview</p>
                </div>

                <div className="flex justify-center">
                  <img
                    src={photoUrl}
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
              <div className="h-1/2 flex flex-col gap-3 w-full">
                <div className="flex gap-3 p-3 items-center bg-[#202C2C]  w-full">
                  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                    <Icon
                      icon="material-symbols:docs"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[14px]">About</p>
                    <p className="text-[12px] break-all">
                      {!about ? "not specified" : about}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 items-center  bg-[#202C2C]">
                  <div className="flex gap-2 items-end w-full">
                    <div className="bg-[#2D7B6B] h-8 w-8 mb-1 rounded-[5px] flex justify-center items-center">
                      <Icon
                        icon="uil:calender"
                        width={16}
                        className="text-white"
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
                    <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
                      <Icon
                        icon="foundation:torsos-male-female"
                        width={16}
                        className="text-white"
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
                    <Icon
                      icon="icons8:idea"
                      style={{ height: 25, width: 25 }}
                    />
                  </div>
                  <div>
                    <p className="text-[#2D7B6B] font-bold">Tip</p>
                    <p>
                      A complete Profile helps other know you better. Add a
                      photo and write something about yourself!
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
      </FormProvider>
    </>
  );
}

export default EditProfile;

<div className="flex gap-2 items-end w-full">
  <div className="bg-[#2D7B6B] h-8 w-9 mb-1 rounded-[5px] flex justify-center items-center">
    <Icon icon="material-symbols:docs" width={16} className="text-white" />
  </div>
  <fieldset className="fieldset p-0 w-full">
    <p>About:</p>
    <div className="flex input bg-[#202C2C] border-[#3E5A5A] border w-full">
      <RHFTextArea
        name="about"
        placeholder="About"
        className="outline-none w-full"
      />
    </div>
    {/* {errors?.firstName &&
                      handleFormErrors(errors?.firstName?.message)} */}
  </fieldset>
</div>;
