import React from "react";

import "./Rightbar.css"
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const HomeRightbar = () => {
        return (
            <>
                <div className="rightbar-event">
                    <div className="rightbar-event__list">
                        <img src="assets/star.png" alt="" className="rightbar-event-list__starImg" />
                        <span className="rightbar-event-list__text"><b>フォロワー限定</b>イベント開催中</span>
                    </div>
                    <img src="assets/event.jpeg" alt="" className="rightbar-event__adImg" />
                </div>
                <div className="rightbar-onlineFriend">
                    <h4 className="rightbar-onlineFriend__title">オンラインの友達</h4>
                    <ul className="rightbar-onlineFriend__list">
                        {Users.map(user => {
                            return <Online user={user} key={user.id}/>;
                        })}
                    </ul>
                </div>
                <div className="rightbar-promotion">
                    <p className="rightbar-promotion__title">プロモーション広告</p>
                    <div className="rightbar-promotion__list">
                        <div className="rightbar-promotion__item">
                            <img src="assets/promotion/promotion1.jpeg" alt="" className="rightbar-promotion__img" />
                            <p className="rightbar-promotion__name">ショッピング</p>
                        </div>
                        <div className="rightbar-promotion__item">
                            <img src="assets/promotion/promotion2.jpeg" alt="" className="rightbar-promotion__img" />
                            <p className="rightbar-promotion__name">カーショップ</p>
                        </div>
                        <div className="rightbar-promotion__item">
                            <img src="assets/promotion/promotion3.jpeg" alt="" className="rightbar-promotion__img" />
                            <p className="rightbar-promotion__name">ShinCode株式会社</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                <section className="user-info">
                    <h4 className="user-info__title">ユーザー情報</h4>
                    <span className="user-info__birthPlace">出身:</span>
                    <span className="user-info__birthPlace">福岡</span>
                </section>
                <section className="yourFriend">
                    <h4 className="yourFriend__title">あなたの友達</h4>
                    <div className="yourFriend-followings">
                        <div className="yourFriend-following">
                            <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className="yourFriend-following__profileImg" />
                            <span className="yourFriend-following__profileName">Shin Code</span>
                        </div>
                        <div className="yourFriend-following">
                            <img src={PUBLIC_FOLDER + "/person/2.jpeg"} alt="" className="yourFriend-following__profileImg" />
                            <span className="yourFriend-following__profileName">Tanaka</span>
                        </div>
                        <div className="yourFriend-following">
                            <img src={PUBLIC_FOLDER + "/person/3.jpeg"} alt="" className="yourFriend-following__profileImg" />
                            <span className="yourFriend-following__profileName">Koga</span>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    return (
        <section className="rightbar">
            <div className="rightbar-wrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </section>
    )
}