import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postReducer = createSlice({
    name: "post",
    initialState: {
        likes: [],
    },
    reducers: {
    },
});

// redux thunk
export const likePost = ({ payload }) => {
    return async (dispatch, getstate) => {
        try {
            await axios.put(`/posts/${payload.postId}/like`, payload.userId);
        } catch (err) {
            console.log(err);
        }
    }
}
export const { likeSuccess } = postReducer.actions;

export default postReducer.reducer;