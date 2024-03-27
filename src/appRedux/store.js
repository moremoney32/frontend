import { configureStore } from "@reduxjs/toolkit";
import userData from "./features/userSlice"
import allUserData from "./features/allUserSlice"
import allPostData from "./features/allPostSlice"
import userAuth from "./features/authSlice"

export default configureStore({
    reducer: {
      userInfos: userData,
      allUserDatas:allUserData,
      allPostDatas:allPostData,
      userId:userAuth
    }
  });