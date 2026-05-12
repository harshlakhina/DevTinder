import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/contsants";
import { Icon } from "@iconify/react";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../Hook/rhf-textfield";
import RHFTextArea from "../Hook/rhf-textarea";
import { GenderOptions } from "../Utils/genderOptions";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../schema/validators";

function SignUp() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderError, setGenderError] = useState(false);

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleSignUp(data) {
    const { firstName, lastName, email, password, age, about } = data;
    try {
      const data = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
          age,
          gender: selectedGender,
          about,
        },
        { withCredentials: true },
      );

      console.log(data.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    if (selectedGender === null) setGenderError(true);
    if (selectedGender !== null) handleSignUp(data);
  };

  const handleActiveGender = (value) => {
    setSelectedGender(value);
  };

  const handleFormErrors = (msg) => (
    <span className="text-red-600 text-[14px]">{msg}</span>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center bg-[#f6f6f7] py-5">
          <div
            className={`w-110 bg-white border border-[#ECE8FF] rounded-xl backdrop-blur-md shadow-lg`}
          >
            <div className="card-body">
              <h2 className="card-title justify-center text-[#111827] font-bold">
                Sign Up
              </h2>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2 text-[#7C4DFF] items-center">
                  <Icon icon="iconamoon:profile-fill" width={20} />
                  <h1 className="text-[15px]">Basic Information</h1>
                </div>
                <div className="flex gap-4">
                  <fieldset className="fieldset p-0">
                    <div className="flex input bg-white  border-gray-200 ">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={20}
                        className="text-[#7C4DFF]"
                      />

                      <RHFTextField name="firstName" placeholder="FirstName" />
                    </div>
                    {errors?.firstName &&
                      handleFormErrors(errors?.firstName?.message)}
                  </fieldset>

                  <fieldset className="fieldset p-0">
                    <div className="flex input bg-white  border-gray-200 ">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={20}
                        className="text-[#7C4DFF]"
                      />
                      <RHFTextField name="lastName" placeholder="lastName" />
                    </div>
                    {errors?.lastName &&
                      handleFormErrors(errors?.lastName?.message)}
                  </fieldset>
                </div>

                <div className="flex gap-4">
                  <fieldset className="fieldset p-0 ">
                    <div className="flex input bg-white  border-gray-200 ">
                      <Icon
                        icon="mdi:email"
                        width={20}
                        className="text-[#7C4DFF]"
                      />
                      <RHFTextField
                        name="email"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                    {errors?.email && handleFormErrors(errors?.email?.message)}
                  </fieldset>

                  <fieldset className="fieldset p-0">
                    <div className="flex input bg-white  border-gray-200 ">
                      <Icon
                        icon="mdi:lock"
                        width={20}
                        className="text-[#7C4DFF]"
                      />

                      <RHFTextField
                        name="password"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                    {errors?.password &&
                      handleFormErrors(errors?.password?.message)}
                  </fieldset>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2 text-[#7C4DFF] items-center">
                  <Icon icon="iconamoon:profile-fill" width={20} />
                  <h1 className="text-[15px]">Profile Information</h1>
                </div>

                <div className="flex gap-2 justify-between">
                  {GenderOptions.map(({ icon, value, label }) => {
                    const isActive = selectedGender === value;
                    return (
                      <div
                        className={`flex px-6 py-1.5 rounded-full ${
                          isActive
                            ? "bg-[#5B34F2] text-white"
                            : " text-black hover:bg-[#5B34F2] hover:border-[#5B34F2] border-1 border-black"
                        }text-sm  hover:text-white transition cursor-pointer`}
                        onClick={() => handleActiveGender(value)}
                      >
                        <Icon icon={icon} width={20} />
                        <p>{label}</p>
                      </div>
                    );
                  })}
                </div>

                {genderError && (
                  <span className="text-red-600 text-[14px]">
                    Gender is Required
                  </span>
                )}

                <div className="flex gap-3 w-full">
                  <div className="flex gap-2  w-full">
                    <fieldset className="fieldset ">
                      <div className="flex input bg-white  border-gray-200 ">
                        {" "}
                        <Icon
                          icon="uil:calender"
                          width={20}
                          className="text-[#7C4DFF]"
                        />
                        <RHFTextField
                          name="age"
                          placeholder="Age"
                          type="number"
                          // className="outline-none rounded-md w-full h-9"
                        />
                      </div>
                      {errors?.age && handleFormErrors(errors?.age?.message)}
                    </fieldset>
                    <fieldset className="fieldset ">
                      <div className="flex input bg-white  border-gray-200 ">
                        <Icon
                          icon="mdi:location"
                          width={20}
                          className="text-[#7C4DFF]"
                        />
                        <RHFTextField name="location" placeholder="Location" />
                      </div>
                    </fieldset>
                  </div>
                </div>

                <fieldset className="fieldset p-0">
                  <div className="flex input bg-white  border-gray-200 w-full">
                    <Icon
                      icon="material-symbols:docs"
                      width={20}
                      className="text-[#7C4DFF]"
                    />

                    <RHFTextField
                      name="skills"
                      placeholder="Skills ( e.g. React , Node.js , MongoDB )"
                    />
                  </div>
                  {errors?.skills && handleFormErrors(errors?.skills?.message)}
                </fieldset>

                <fieldset className="fieldset p-0">
                  <div className="flex bg-white  border-gray-200  border w-full p-2 gap-2">
                    <Icon
                      icon="mdi:pencil"
                      width={20}
                      className="text-[#7C4DFF]"
                    />

                    <RHFTextArea
                      name="about"
                      placeholder="Tell us about yourself..."
                      className="w-full min-h-15 outline-none placeholder:text-[#949caa] text-black"
                    />
                  </div>
                  {errors?.about && handleFormErrors(errors?.about?.message)}
                </fieldset>
              </div>

              <div className="justify-center card-actions">
                <button className="btn bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] hover:from-[#6C3CF0] hover:to-[#4F2BE0] text-white font-semibold px-6 py-2 rounded-lg shadow-md border-none">
                  Sign Up
                </button>
              </div>

              <div className="flex justify-center">
                <div className="flex">
                  <p className="text-[#111827]">Existing User ?</p>
                  <p
                    className="text-[#7C4DFF] hover:text-[#5932f7] font-semibold cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default SignUp;
