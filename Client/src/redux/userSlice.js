import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const userSlice  =createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData =action.payload
        },
        setCity:(state,action)=>{
            state.city = action.payload
        },
        clearUserData:(state,action)=>{
            state.userData=action.payload
        }
    }
})

export const { setUserData, setCity, clearUserData } = userSlice.actions;
  


export default userSlice.reducer
