import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "userId",
    initialState: {},
    reducers: {
      setAuth: (state, action) => {
        return action.payload;
      }
    }
  });
  
  export const { setAuth } = authSlice.actions;
  export default authSlice.reducer;