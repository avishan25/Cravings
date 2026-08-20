import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth, googlep } from "../../firebase.js";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {RegsiterSchema,RegsiterWithGoogleSchema,} from "../validator/RegisterValidator.jsx";
import Logo from "../assets/CravingsLogo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
const Register = () => {
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const dispatch =useDispatch();
  // 2. Handle standard email/password registration
  const handleRegister = async () => {};

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Google Sign-In Popup Successful!", result);
      const googleEmail = result.user.email;
      const googleName = result.user.displayName;
      const googlePhone = result.user.phoneNumber || phone;

      setEmail(googleEmail);
      setFullName(googleName);
      setPhone(googlePhone);
      const payload = {
        fullName: googleName,
        email: googleEmail,
        phone: googlePhone,
        role,
      };

      console.log(payload, "Working here");
      const response = RegsiterWithGoogleSchema.safeParse(payload);
      console.log("Form Validation", response);

      if (!response.success) {
        const formattedErrors = response.error.flatten().fieldErrors;

        const cleanErrors = Object.keys(formattedErrors).reduce((acc, key) => {
          acc[key] = formattedErrors[key][0];
          return acc;
        }, {});
        setFieldErrors(cleanErrors);

        console.log(cleanErrors);
        return;
      }

      setFieldErrors({});
      const res = await axios.post(
        "http://localhost:4500/api/auth/register/google-auth",
        payload,
        { withCredentials: true },
      );
     
      dispatch(setUserData(result.data.data))
      toast.success(res.data.message);

      console.log(res);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Input");
      console.log(err);
    }
  };

  // ...rest of your JSX unchanged, just wire the button to handleGoogleAuth

  return (
    <>
      <div className="bg-bgColor  backdrop-blur-3xl w-full flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 border-[1px] border-borderColor flex flex-col gap-2">
          {/* LOGO */}
          <div className="flex items-center justify-center ">
            <img src={Logo} className="h-20" alt="" />
            <h1 className="font-bold text-primaryColor text-3xl text-center ">
              2 YUM{" "}
            </h1>
          </div>

          <div className="flex flex-col max-w-screen">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Full Name"
              className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
            />
            {fieldErrors.fullName && (
              <span className="text-red-500 my-1 px-1">
                {fieldErrors.fullName}
              </span>
            )}
          </div>

          <div className="flex flex-col max-w-screen">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
            />
            {fieldErrors.email && (
              <span className="text-red-500 my-1 px-1">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col max-w-screen">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
              required
            />
            {fieldErrors.phone && (
              <span className="text-red-500 my-1 px-1">
                {fieldErrors.phone}
              </span>
            )}
          </div>

          <div className="flex flex-col max-w-screen ">
            <label htmlFor="Password">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="bg-white w-full border rounded-lg focus:outline-none focus:border-primaryColor px-3 py-2 border-borderColor"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 cursor-pointer"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            {fieldErrors.password && (
              <span className="text-red-500 my-1 px-1">
                {fieldErrors.password}
              </span>
            )}
          </div>

          <div className="flex gap-3 cursor-pointer">
            {["user", "restaurant", "rider"].map((ele) => {
              return (
                <span
                  key={ele}
                  className={`border  border-borderColor py-1 rounded-lg px-2 ${role === ele ? "bg-primaryColor text-white" : "bg-white"} transition-colors`}
                  onClick={() => setRole(ele)}
                >
                  {ele}
                </span>
              );
            })}
          </div>
          <button
            className="bg-primaryColor px-3 py-2 text-white  w-full border rounded-lg focus:outline-none cursor-pointer hover:bg-hoverColor"
            onClick={handleRegister}
          >
            Register
          </button>

          <div
            className="flex items-center justify-center border border-borderColor w-full gap-2 my-2 py-1 rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={() => handleGoogleAuth()}
          >
            <FcGoogle size={30} />
            Sign Up with Google
          </div>
          <div onClick={() => navigate("/login")} className="text-center">
            Already Have an account?{" "}
            <span className="text-primaryColor cursor-pointer">Log In</span>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* ; 
   

*/
}
export default Register;
