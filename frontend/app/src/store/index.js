import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/Auth.js"
import registerUserReducer from "./modules/Register.js"
import postReducer from "./modules/Post.js"

export default configureStore({
    reducer: {
        // createSlice関数からActionCreaterが自動的に生成され（例えばauth/loginStart）、ActionTypeオブジェクトがdispatchに渡された後、
        // reducersオブジェクト内に一致するActionが実行されることでレンダリングが行われる
        auth: authReducer,
        register: registerUserReducer,
        post: postReducer,
    }
});