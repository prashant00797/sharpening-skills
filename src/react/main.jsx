import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import AppLayout from "./AppLayout.jsx";
import AppLogic from "./AppLogic.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    {/* <AppLayout /> */}
    <AppLogic />
  </Provider>,
);
