import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            if (action.payload) {
                localStorage.setItem("accessToken", action.payload);
            } else {
                localStorage.removeItem("accessToken");
            }
        },
    },
});

export const { setAdmin, setAccessToken } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
