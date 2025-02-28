import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  test: { a: 1 },
};

// generates a slice which replaces types, actions, and reducers
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      // state is immutable - redux toolkit does this for us
      // using a library called immer behind the scenes
      state.currentUser = action.payload;
    },
  },
});

// generates actions
export const { setCurrentUser } = userSlice.actions;

// generates a reducer
export const userReducer = userSlice.reducer;
