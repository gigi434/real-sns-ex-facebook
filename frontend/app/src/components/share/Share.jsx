import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

import "./Share.css"

export default function Share() {
    const user = useSelector(state => state.auth.user);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <section className="container">
            <div className="wrapper">
                <div className="top">
                    <img src={`${PUBLIC_FOLDER}${user.profilePicture}`} alt="" className="top__img" />
                    <input type="text" className="top__input" placeholder="今何してるの？"/>
                </div>
                <hr className="hr"></hr>
                <div className="button">
                    <div className="button-options">
                        <div className="button-option">
                            <Image className="button-option__icon" htmlColor="blue"/>
                            <span className="button-option__text">写真</span>
                        </div>
                        <div className="button-option">
                            <Gif className="button-option__icon" htmlColor="hotpink"/>
                            <span className="button-option__text">Gif</span>
                        </div>
                        <div className="button-option">
                            <Face className="button-option__icon" htmlColor="green"/>
                            <span className="button-option__text">気持ち</span>
                        </div>
                        <div className="button-option">
                            <Analytics className="button-option__icon" htmlColor="red"/>
                            <span className="button-option__text">投票</span>
                        </div>
                    </div>
                    <button className="button__share">投稿</button>
                </div>
            </div>
        </section>
    )
}