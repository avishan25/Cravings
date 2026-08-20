import React from "react";
import Logo from "../assets/CravingsLogo.png";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../redux/userSlice";

function Nav() {
  const [qty, setQty] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { userData, city } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const handleLogout = async () => {
    try {
      const result = await axios.get("http://localhost:4500/api/auth/logout",{withCredentials:true});

      
      console.log(result.data.message);
       dispatch(clearUserData(null))
    } catch (error) {
      console.log(error);
     
     
    }
  };
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && (
        <div className="md:hidden w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-primaryColor" />
            <div className="w-[80%] truncate text-gray-600">
              {city || "Enable Loaction Access"}
            </div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-primaryColor" />
            <input
              type="text"
              placeholder="Search Delicious Food... "
              className="w-full outline-0 text-gray-700 px-[10px]"
            />
          </div>
        </div>
      )}
      <h1 className="font-bold text-primaryColor text-3xl mb-2">2YUM</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-primaryColor" />
          <div className="w-[80%] truncate text-gray-600">
            {city || "Enable Location Access"}
          </div>
        </div>
        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-primaryColor" />
          <input
            type="text"
            placeholder="Search Delicious Food... "
            className="w-full outline-0 text-gray-700 px-[10px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!showSearch && (
          <IoIosSearch
            size={25}
            className="text-primaryColor md:hidden"
            onClick={() => setShowSearch(true)}
          />
        )}
        {showSearch && (
          <RxCross2
            size={25}
            className="text-primaryColor md:hidden"
            onClick={() => setShowSearch(false)}
          />
        )}

        <div className="relative cursor-pointer">
          <BsCart4 size={25} className="text-primaryColor" />
          <span className="text-primaryColor absolute top-[-12px] right-[-9px]">
            {qty}
          </span>
        </div>

        <button className="hidden md:block text-black text-sm font-medium px-3 py-2 rounded-lg bg-[#ff4d2d]/10">
          My Orders
        </button>

        <div
          className="rounded-full bg-primaryColor w-[40px] h-[40px] flex items-center justify-center text-white shadow-xl font-semibold cursor-pointer text-[18px]"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData.fullName.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[10%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="text-primaryColor md:hidden font-semibold cursor-pointer">
              My orders
            </div>
            <div
              className="font-semibold cursor-pointer text-primaryColor"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
