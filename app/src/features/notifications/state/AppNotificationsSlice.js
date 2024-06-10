import { createSlice, createAction } from "@reduxjs/toolkit";

const notificationInitialState = {
  open: false,
  type: "info",
  message: "",
  timeout: 4000,
};

const AppNotificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addNotification: (state, action) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({ ...state, open: false }),
  },
});

export const AppNotificationActions = {
  addNotification: createAction("notification/addNotification"),
  clearNotification: createAction("notification/clearNotification"),
};

export const AppNotificationReducer = AppNotificationSlice.reducer;