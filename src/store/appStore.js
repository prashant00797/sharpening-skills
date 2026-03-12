import { configureStore } from "@reduxjs/toolkit";
import suggestionsSlice from "./suggestionSlice";
const appStore = configureStore({
  reducer: {
    suggestions: suggestionsSlice,
  },
});
export default appStore;
