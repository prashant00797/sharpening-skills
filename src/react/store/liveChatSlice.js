import { createSlice } from "@reduxjs/toolkit";

const liveChatSlice = createSlice({
  name: "liveChat",
  initialState: {
    messages: [],
  },
  reducers: {
    addLiveChat: (state, action) => {
      state.messages.unshift(action.payload);
      if (state.messages.length > 25) {
        state.messages.pop();
      }
    },
  },
});

export const { addLiveChat } = liveChatSlice.actions;
export default liveChatSlice.reducer;
