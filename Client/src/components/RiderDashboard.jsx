import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

function RiderDashboard() {
  const { userData } = useSelector((state) => state.user);

  const getRiderAssignments =async()=>{
    try {
      const result =await axios.get("http://localhost:4500/api/order/get-rider-assignments",{withCredentials:true})
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
 getRiderAssignments()
  },[userData])
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 bg-[#fff9f6] items-center overflow-y-auto">
      <Nav />

      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2">
          <h1 className="text-xl font-bold text-primaryColor">
            Welcome, {userData.fullName}
          </h1>
          <p className="text-primaryColor">
            <span className="font-semibold">Latitude:{userData.location.coordinates[1]}</span>
            <span className="font-semibold">Longitude:{userData.location.coordinates[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;
