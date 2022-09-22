import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../store/modules/Register";
import "./Register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // パスワードと確認用パスワードが合致しているか
        if (password.current.value !== passwordConfirmation.current.value) {
            passwordConfirmation.current.setCustomValidity("確認用パスワードが違います")
        } else {
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                }
                // /api/registerを叩きユーザーを作成する
                dispatch(registerUser(user))
                navigate("/login");
            } catch (err) {
                console.log(err)
            }
        } 
    }

    return (
        <section className="register-container">
            <section className="register-wrapper">
                <div className="service-title register-page__service-title">
                    <h3 className="service-title__logo">Real SNS</h3>
                    <span className="service-title__desc">本格的なSNSを、あなたの手で</span>
                </div>
                <form className="register-form register-page__register-form" onSubmit={e => handleSubmit(e)}>
                    <p className="register-form__message">新規登録はこちら</p>
                    <input type="text" className="register-form__input" placeholder="ユーザー名" required ref={username}/>
                    <input type="email" className="register-form__input" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="register-form__input" placeholder="パスワード" required minLength="6" ref={password}/>
                    <input type="password" className="register-form__input" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation}/>
                    <button type="submit" className="register-form__signUpButton" >サインアップ</button>
                    <button className="register-form__loginButton">ログイン</button>
                </form>
            </section>
        </section>
    )
};