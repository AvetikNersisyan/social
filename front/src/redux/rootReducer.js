import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../redux/reducers/user";

export const rootReducer = combineReducers({
  user: userSlice,
});
