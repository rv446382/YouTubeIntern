import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    userLocation: "",
    loading: false,
    error: false,
    showSidebar: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        signupStart: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.loggedInUser = action.payload;
        },
        signupFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            state.userLocation = "";
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
        SetLocation: (state, action) => {
            state.userLocation = action.payload;
        },
        SetSidebar: (state, action) => {
            state.showSidebar = action.payload;
        }

    },
});

export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout, subscription, SetLocation, SetSidebar } =
    userSlice.actions;

export default userSlice.reducer;