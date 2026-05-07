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
  const [selectedGender, setSelectedGender] = useState("");
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
    const { firstName, lastName, email, password } = data;
    try {
      const data = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
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
    if (selectedGender === "") setGenderError(true);
    handleSignUp(data);
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
        <div className="flex justify-center items-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] py-5">
          <div
            className={`w-110 bg-[#2B3C3B]/90 rounded-xl backdrop-blur-md shadow-sm`}
          >
            <div className="card-body">
              <h2 className="card-title justify-center text-[#EAF3F2] font-bold">
                Sign Up
              </h2>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2 text-teal-400 items-center">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-teal-300"
                  />
                  <h1 className="text-teal-400  text-[15px]">
                    Basic Information
                  </h1>
                </div>
                <div className="flex gap-4">
                  <fieldset className="fieldset p-0">
                    <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={20}
                        className="text-[#7D8F8C]"
                      />

                      <RHFTextField name="firstName" placeholder="FirstName" />
                    </div>
                    {errors?.firstName &&
                      handleFormErrors(errors?.firstName?.message)}
                  </fieldset>

                  <fieldset className="fieldset p-0">
                    <div className="flex input bg-[#202C2C] border-[#3E5A5A] border">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={20}
                        className="text-[#7D8F8C]"
                      />

                      <RHFTextField name="lastName" placeholder="lastName" />
                    </div>
                    {errors?.lastName &&
                      handleFormErrors(errors?.lastName?.message)}
                  </fieldset>
                </div>

                <div className="flex gap-4">
                  <fieldset className="fieldset p-0 ">
                    <div className="flex input bg-[#202C2C] border-[#3E5A5A] ">
                      <Icon
                        icon="mdi:email"
                        width={20}
                        className="text-[#7D8F8C]"
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
                    <div className="flex input bg-[#202C2C] border-[#3E5A5A] ">
                      <Icon
                        icon="mdi:lock"
                        width={20}
                        className="text-[#7D8F8C]"
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
                <div className="flex gap-2">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-teal-300"
                  />
                  <h1 className="text-teal-400 text-[15px]">
                    Profile Information
                  </h1>
                </div>

                <div className="flex gap-2 justify-between">
                  {GenderOptions.map(({ icon, value }) => {
                    const isActive = selectedGender === value;
                    return (
                      <div
                        className={`flex px-6 py-1.5 rounded-full border border-white/30  ${
                          isActive
                            ? "bg-teal-400/20 text-white border-teal-300"
                            : "bg-slate-900/50 text-white/70 border-white/10 hover:bg-teal-500/20 hover:border-teal-400/50"
                        } text-[#7D8F8C] text-sm hover:bg-teal-400/10 hover:border-teal-300 hover:text-white transition cursor-pointer`}
                        onClick={() => handleActiveGender(value)}
                      >
                        <Icon icon={icon} width={20} />
                        <p>{value}</p>
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
                      <div className="flex input bg-[#202C2C] border-[#3E5A5A] border items-center gap-2 ">
                        <Icon
                          icon="uil:calender"
                          width={20}
                          className="text-[#7D8F8C]"
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
                      <div className="flex input bg-[#202C2C] border-[#3E5A5A] border items-center gap-2">
                        <Icon
                          icon="mdi:location"
                          width={20}
                          className="text-[#7D8F8C]"
                        />
                        <RHFTextField name="location" placeholder="Location" />
                      </div>
                    </fieldset>
                  </div>
                </div>

                <fieldset className="fieldset p-0">
                  <div className="flex input bg-[#202C2C] border-[#3E5A5A] border w-full">
                    <Icon
                      icon="material-symbols:docs"
                      width={20}
                      className="text-[#7D8F8C]"
                    />

                    <RHFTextField
                      name="skills"
                      placeholder="Skills ( e.g. React , Node.js , MongoDB )"
                    />
                  </div>
                  {errors?.skills && handleFormErrors(errors?.skills?.message)}
                </fieldset>

                <fieldset className="fieldset p-0">
                  <div className="flex  bg-[#202C2C] border-[#3E5A5A] border w-full p-2 gap-2">
                    <Icon
                      icon="mdi:pencil"
                      width={20}
                      className="text-[#7D8F8C]"
                    />

                    <RHFTextArea
                      name="about"
                      placeholder="Tell us about yourself..."
                      className="w-full min-h-15 outline-none"
                    />
                  </div>
                  {errors?.about && handleFormErrors(errors?.about?.message)}
                </fieldset>
              </div>

              <div className="justify-center card-actions">
                <button className="btn bg-[#C46243] hover:bg-[#A84E36] text-white font-semibold px-6 py-2 rounded-lg shadow-md border-none">
                  Sign Up
                </button>
              </div>

              <div className="flex justify-center">
                <div className="flex">
                  <p className="text-[#A7B8B6]">Existing User ?</p>
                  <p
                    className="text-[#C46243] hover:text-[#A84E36] font-semibold cursor-pointer"
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
