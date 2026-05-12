import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/contsants";
import { Icon } from "@iconify/react";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../Hook/rhf-textfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../schema/validators";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleClickLogin(data) {
    const { email, password } = data;
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    handleClickLogin(data);
  };

  const handleFormErrors = (msg) => (
    <span className="text-red-600 text-[14px]">{msg}</span>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center bg-[#f6f6f7] h-[90vh]">
          <div
            className={`w-80 h-fit bg-white border border-[#ECE8FF] rounded-xl backdrop-blur-md  shadow-xl shadow-[#7C4DFF]/10`}
          >
            <div className="card-body">
              <h2 className="card-title justify-center text-[#111827] font-bold">
                Login
              </h2>

              <fieldset className="fieldset p-0 ">
                <legend className="fieldset-legend text-[#A7B8B6]">
                  Email ID:
                </legend>
                <div className="flex input bg-white  border-gray-200 focus:border focus:border-[#ff4d74]">
                  <Icon
                    icon="mdi:email"
                    width={20}
                    className="text-[#7C4DFF]"
                  />

                  <RHFTextField name="email" placeholder="Email" type="email" />
                </div>
                {errors.email && handleFormErrors(errors?.email?.message)}
              </fieldset>

              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend text-[#A7B8B6]">
                  Password:
                </legend>
                <div className="flex input bg-white  border-gray-200 ">
                  <Icon icon="mdi:lock" width={20} className="text-[#7C4DFF]" />

                  <RHFTextField
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                {errors.password && handleFormErrors(errors?.password?.message)}
              </fieldset>

              <div className="justify-center card-actions">
                <button className="btn bg-gradient-to-r from-[#7C4DFF] to-[#5B34F2] hover:from-[#6C3CF0] hover:to-[#4F2BE0] text-white font-semibold px-6 py-2 rounded-lg shadow-md border-none">
                  Login
                </button>
              </div>

              <div className="flex justify-center">
                <div className="flex">
                  <p className="text-[#111827] ">New User?</p>
                  <p
                    className="text-[#7C4DFF] hover:text-[#5932f7] font-semibold cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up here
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

export default Login;
