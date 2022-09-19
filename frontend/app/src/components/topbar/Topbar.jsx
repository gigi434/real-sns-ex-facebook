import React from "react";
import { Chat, Notifications, Search } from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbar-logo">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="topbar-logo__title">Real SNS</span>
                </Link>
            </div>
            <div className="topbar-search-form">
                <div className="topbar-search-form__items">
                    <div className="topbar-search-form__bar">
                        <Search className="topbar-search-form__icon"/>
                        <input type="text" className="topbar-search-form__input" placeholder="探し物はなんですか？" />
                    </div>
                </div>
            </div>
            <div className="topbar-notification">
                <div className="topbar-notification-item">
                    <div className="topbar-notification-item__icon">
                        <Chat />
                        <span className="topbar-notification-item__badge">1</span>
                    </div>
                    <div className="topbar-notification-item__icon">
                        <Notifications />
                        <span className="topbar-notification-item__badge">2</span>
                    </div>
                </div>
                <img className="topbar__profile-image" src="/assets/person/1.jpeg" alt="" />
            </div>
        </div>
    )
}