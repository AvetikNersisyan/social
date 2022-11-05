import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../redux/reducers/user";
import feedSlice from "../redux/reducers/feed";

export const rootReducer = combineReducers({
  user: userSlice,
  feed: feedSlice,
});
