import React from "react";

import "./Online.css";

export default function Online({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="online-friend__item">
            <div className="online-friend__icon">
                <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="online-friend__profileImg" />
                <span className="online-friend__icon--online"></span>
            </div>
            <div className="online-friend__userName">{user.username}</div>
        </li>
    )
}