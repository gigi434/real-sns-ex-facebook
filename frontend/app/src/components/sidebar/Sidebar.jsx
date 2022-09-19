import { Home, Search, MessageRounded, Notifications, Bookmark, Person, Settings } from "@mui/icons-material";
import React from "react";
import CloseFriend from "../closeFriend/CloseFriend";

import "./Sidebar.css";
import { Users } from "../../dummyData";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item__icon"/>
                        <Link to="/" style={{textDecoration: "none", color: "black"}}>
                            <span className="sidebar-list-item__text">ホーム</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Search className="sidebar-list-item__icon"/>
                        <span className="sidebar-list-item__text">検索</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Notifications className="sidebar-list-item__icon"/>
                        <span className="sidebar-list-item__text">通知</span>
                    </li>
                    <li className="sidebar-list-item">
                        <MessageRounded className="sidebar-list-item__icon"/>
                        <span className="sidebar-list-item__text">メッセージ</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Bookmark className="sidebar-list-item__icon"/>
                        <span className="sidebar-list-item__text">ブックマーク</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Person className="sidebar-list-item__icon"/>
                        <Link to="/profile/shincode" style={{ textDecoration: "none", color: "black"}}>
                            <span className="sidebar-list-item__text">プロフィール</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item">
                        <Settings className="sidebar-list-item__icon"/>
                        <span className="sidebar-list-item__text">設定</span>
                    </li>
                </ul>
                <hr className="sidebar__hr"></hr>
                <ul className="sidebar__close-friend-list close-friend-list">
                    {Users.map(user => {
                        return <CloseFriend user={user} key={user.id}/>
                    })}
                </ul>
            </div>
        </div>
    )
}