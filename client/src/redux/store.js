import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import communicationReducer from "./communicationSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    companies: companyReducer,
    communications: communicationReducer,
    notifications: notificationReducer,
  },
});
