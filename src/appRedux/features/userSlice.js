import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userInfos",
    initialState: {},
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      }
    }
  });
  
  export const { setUser } = userSlice.actions;
  export default userSlice.reducer;