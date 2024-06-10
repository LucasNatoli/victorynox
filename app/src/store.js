import { configureStore } from "@reduxjs/toolkit";
import { binanceSlice } from "./features/api/binanceSlice";
import { restApiSlice } from "./features/api/restApiSlice";
import { AppNotificationReducer } from "./features/notifications";
import { BackdropReducer } from "./features/ui";

export const store = configureStore({
  reducer: {
    appNotifications: AppNotificationReducer,
    backdrop: BackdropReducer,
    [binanceSlice.reducerPath]: binanceSlice.reducer,
    [restApiSlice.reducerPath]: restApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(binanceSlice.middleware)
      .concat(restApiSlice.middleware)
});

export const RootState = store.getState();