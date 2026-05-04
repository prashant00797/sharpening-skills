import { configureStore } from "@reduxjs/toolkit";
import suggestionsSlice from "./suggestionSlice";
import liveChatSlice from "./liveChatSlice";
const appStore = configureStore({
  reducer: {
    suggestions: suggestionsSlice,
    liveChat: liveChatSlice,
  },
});
export default appStore;
