import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { addHeaderJWT } from './headerJWT';



async function fetchUserData(){
  let data = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",

    headers: addHeaderJWT(),
  })
  let response = await data.json()
  return response.body
}


const userStateSlice = createSlice({
    name:"status",
    initialState:{
        online:window.localStorage.getItem("token")?true:false,
        data:window.localStorage.getItem("token")?await fetchUserData():""
    },
    reducers:{
        toggle:(state,action)=>{
             state.online = action.payload
        },
        addUser:(state,action)=>{
          state.data = action.payload
        },
        clear:(state,action)=>{
          state.online = false
          state.data=""
        }

        
    }
})
export const store = configureStore({
  reducer: {
    status:userStateSlice.reducer
  },
})