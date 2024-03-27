import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "", // Initialisation du message
  allUserData: [] // Initialisation avec un tableau vide
};

const usersDataSlice = createSlice({
  name: "allUserDatas",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.message = action.payload.message;
      state.allUserData = action.payload.allUserData;
    }
  }
});

export const { setUserData } = usersDataSlice.actions;
export default usersDataSlice.reducer;