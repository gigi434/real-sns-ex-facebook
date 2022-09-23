import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: {
            // TODO 毎回ブラウザの更新ごとにログインをする必要があるため記載した　使用時には空にすること
            _id: "6314be3ce9738babfe4fa4fd",
            username: "shincode",
            email: "JohnDoe@gmail.com",
            password: "password123",
            profilePicture: "/assets/person/1.jpeg",
            coverPicture: "/assets/post/3.jpeg",
            followers: [],
            followings: [],
            isAdmin: false,
            createdAt: "2022-09-04T15:03:24.997+00:00",
            updatedAt: "2022-09-18T11:38:00.025+00:00",
            __v: 0,
            desc: "Udemy講師",
        },
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