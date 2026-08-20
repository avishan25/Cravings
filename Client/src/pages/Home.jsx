import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from "../components/UserDashboard"
import RiderDashboard from "../components/RiderDashboard";
import RestaurantDashboard from "../components/RestaurantDashboard";


function Home() {
    const{userData} =useSelector(state=>state.user);
    
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "restaurant" && <RestaurantDashboard />}
      {userData.role == "rider" && <RiderDashboard />}
     
    </div>
  );
}

export default Home
