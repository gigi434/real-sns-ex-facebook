import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const registerUserSlice = createSlice({
    name: "registerUser",
    initialState: {
        username: null,
        email: null,
        password: null,
        profilePicture: "",
        error: false,
    },
    reducers: {
        registerSuccess(state, { payload }) {
            return {
                ...state,
                username: payload.username,
                email: payload.email,
                password: payload.password,
                profilePicture: `${PUBLIC_FOLDER}/person/noAvatar.png`,
            };
        },
        registerError(state, { payload }) {
            return {
                ...state,
                error: payload,
            }
        }
    }
});

// middleware
export const registerUser = (payload) => {
    return async (dispatch, getstate) => {
        try {
            dispatch(registerSuccess(payload))
            console.log(getstate())
            const response = await axios.post("auth/register", getstate().register);
            console.log(response.data)
        } catch (err) {
            dispatch(registerError(err));
        }
    };
};

export const { registerSuccess, registerError } = registerUserSlice.actions;

// Reducerをグローバルステートで管理する
export default registerUserSlice.reducer;