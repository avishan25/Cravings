import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function useGetCurrentUser() {
    const dispatch =useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(
          "http://localhost:4500/api/user/current-user",
          { withCredentials: true },
        );
       
        dispatch(setUserData(user.data));
        

      } 
      catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    
  }, []);
}

export default useGetCurrentUser;
