import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const registerUserSlice = createSlice({
    name: "registerUser",
    initialState: {
        username: null,
        email: null,
        password: null,
    },
    reducers: {
        registerSuccess(state, { payload }) {
            return {
                username: payload.username,
                email: payload.email,
                password: payload.password,
                error: false,
            };
        },
        registerError(state, { payload }) {
            return {
                username: null,
                email: null,
                password: null,
                error: payload,
            }
        }
    }
});

// middleware
export const registerUser = (payload) => {
    console.log(payload)
    return async (dispatch, getstate) => {
        try {
            const response = await axios.post("auth/register", payload);
            dispatch(registerSuccess(response.data));
            console.log(response.data)
        } catch (err) {
            dispatch(registerError(err));
        }
    };
};

export const { registerSuccess, registerError } = registerUserSlice.actions;

// Reducerをグローバルステートで管理する
export default registerUserSlice.reducer;