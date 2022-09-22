import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import "./Login.css"
import { getUserData } from "../../store/modules/Auth";

export default function Login() {
    // useRefを使用してDOMを参照することでinput要素の値を監視する
    // useStateとは違い、値が変更されても再レンダリングは行なわない
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getUserData({ email: email.current.value, password: password.current.value })) // getUserData関数によってActionが作成される
    }
    
    return (
        <section className="login-container">
            <section className="login-wrapper">
                <div className="service-title login-page__service-title">
                    <h3 className="service-title__logo">Real SNS</h3>
                    <span className="service-title__desc">本格的なSNSを、あなたの手で</span>
                </div>
                <form className="login-form login-page__login-form" onSubmit={e => handleSubmit(e)}>
                    <p className="login-form__message">ログインはこちら</p>
                    <input
                        type="email"
                        className="login-form__input"
                        placeholder="e-mail"
                        required
                        ref={email}
                    />
                    <input
                        type="password"
                        className="login-form__input"
                        placeholder="password" 
                        required 
                        minLength="6"
                        ref={password}
                    />
                    <button className="login-form__loginButton">ログイン</button>
                    <span className="login-form__forgotText">パスワードを忘れた場合</span>
                    <button className="login-form__registerButton">アカウント登録</button>
                </form>
            </section>
        </section>
    )
};