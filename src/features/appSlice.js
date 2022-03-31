import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  popUp: false,
  users: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    popupSwitch: (state, action) => {
      state.popUp = action.payload.status;
    },
    updateUsers: (state, action) => {
      state.users = [...action.payload.users];
    },
  },
});
export const { enterRoom, popupSwitch, updateUsers } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export const popupStatus = (state) => state.app.popUp;

export const signedUsers = (state) => state.app.users;

export default appSlice.reducer;
