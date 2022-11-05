import { createSlice } from "@reduxjs/toolkit";

const initState = {
  baseData: {
    username: "",
    password: "",
  },
  currentUser: {
    username: "",
    name: "",
    lastName: "",
    isAuth: false,
  },
  postDraft: {
    content: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      return state;
    },
    refreshBaseData: (state, { payload }) => {
      state.baseData = payload;
      return state;
    },
    refreshPostDraft: (state, { payload }) => {
      state.postDraft = payload;
      return state;
    },
  },
});

export const { setUser, refreshBaseData, refreshPostDraft } = userSlice.actions;

export default userSlice.reducer;
