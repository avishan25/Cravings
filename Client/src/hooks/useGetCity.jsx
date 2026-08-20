import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCity } from '../redux/userSlice'

function useGetCity() {
    const dispatch = useDispatch()
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (location)=>{
        const latitude = location.coords.latitude;
         const longitude = location.coords.longitude;

         const result = await axios.get(
           `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_APIKEY}`,
         );
         console.log("Location DATA",result.data.results[0].city)
         dispatch(setCity(result.data.results[0].city))
         
    })
  },[])
  
}

export default useGetCity
