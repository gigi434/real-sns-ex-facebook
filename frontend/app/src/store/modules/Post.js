import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postReducer = createSlice({
    name: "post",
    initialState: {
        likes: [],
    },
    reducers: {
        likePostSuccess: (state, { payload }) => {
            return {
                ...state,
                isliking: true,
                error: false,
            };
        },
        likePostError: (state, { payload }) => {
            return {
                ...state,
                isliking: false,
                error: payload,
            };
        },
    },
});

// redux thunk
export const likePost = (payload) => {
    console.log(payload)
    return async (dispatch, getstate) => {
        try {
            await axios.put(`/posts/${payload.postId}/like`, payload);
            dispatch(likePostSuccess(payload))
        } catch (err) {
            dispatch(likePostError(payload))
        }
    };
};
export const { likePostError, likePostSuccess } = postReducer.actions;

export default postReducer.reducer;