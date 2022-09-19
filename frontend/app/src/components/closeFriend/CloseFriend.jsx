import React from "react";

import "./CloseFriend.css"

export default function CloseFriend({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <li className="close-friend-list-item">
            <img className="close-friend-list-item__img" src={PUBLIC_FOLDER + user.profilePicture} alt="" />
            <span className="close-friend-list-item__name">{user.username}</span>
        </li>
    )
}