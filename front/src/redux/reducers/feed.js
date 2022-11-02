import { createSlice } from '@reduxjs/toolkit'


const initState = {

    list: []
};

const feedSlice = createSlice({
  name: "feed",
  initialState: initState,
  reducers: {
    setFeedData: (state, action) => {
      state.list = action.payload ;
       return state
    },
    // addNewData: (state, {payload}) => {
    //   state.baseData = payload;
    //   return state;
    // }
  },
});

export const { setFeedData } = feedSlice.actions;


export default feedSlice.reducer;
