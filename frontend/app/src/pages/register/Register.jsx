import React from "react";

import "./Register.css"

export default function Register() {
    return (
        <section className="register-container">
            <section className="register-wrapper">
                <div className="service-title register-page__service-title">
                    <h3 className="service-title__logo">Real SNS</h3>
                    <span className="service-title__desc">本格的なSNSを、あなたの手で</span>
                </div>
                <div className="register-form register-page__register-form">
                    <p className="register-form__message">新規登録はこちら</p>
                    <input type="text" className="register-form__input" placeholder="ユーザー名"/>
                    <input type="text" className="register-form__input" placeholder="Eメール"/>
                    <input type="text" className="register-form__input" placeholder="パスワード"/>
                    <input type="text" className="register-form__input" placeholder="確認用パスワード"/>
                    <button className="register-form__signUpButton">サインアップ</button>
                    <button className="register-form__loginButton">ログイン</button>
                </div>
            </section>
        </section>
    )
};