import { createSlice, createAction } from "@reduxjs/toolkit";

const backdropInitialState = {
  open: false,
};

const BackdropSlice = createSlice({
  name: "backdrop",
  initialState: backdropInitialState,
  reducers: {
    isBackdropOpen: (state, action) => ({
      ...backdropInitialState,
      ...action.payload,
    })
  },
});

export const BackdropActions = {
  isBackdropOpen: createAction("backdrop/isBackdropOpen"),
};

export const BackdropReducer = BackdropSlice.reducer;