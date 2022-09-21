import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart(state, { payload }) {
            return {
                user: null, // ユーザー情報があるか
                isFetching: true, // これから情報を取得するか
                error: false, // エラーとして出力するか
            };
        },
        loginSuccess(state, { payload }) {
            return {
                user: payload, 
                isFetching: false, 
                error: false, 
            };
        },
        loginError(state, { payload }) {
            return {
                user: null, 
                isFetching: false, 
                error: payload, 
            };
        }
    }
})

// Redux Thunk(middleware)
export const getUserData = (payload) => {
    return async (dispatch, getState) => {
        dispatch(loginStart());
        try {
            const response = await axios.post("auth/login", payload);
            dispatch(loginSuccess(response.data));
        } catch (err) {
            dispatch(loginError(err));
        }
    };
};

// actionCreaterはredux toolkitを使用すると自動的に作成され,.actionsという配列オブジェクトに格納されている
// メソッドとして使用するためdispatch(loginStart({payload}))とする
export const { loginStart, loginSuccess, loginError } = authReducer.actions;

// store/Auth.jsにてグローバルステートとして状態管理をおこなう
// これにより、useSelectorを使用することでstate.auth.userやstate.auth.isFetchingの値を参照することができる様になる
export default authReducer.reducer;