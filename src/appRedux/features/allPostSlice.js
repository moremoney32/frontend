import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //message: "", // Initialisation du message
  allPostData: [] // Initialisation avec un tableau vide
};

const postsDataSlice = createSlice({
  name: "allPostDatas",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      //state.message = action.payload.message;
      state.allPostData = action.payload.allPostData;
    }
  }
});

export const { setPostData } = postsDataSlice.actions;
export default postsDataSlice.reducer;