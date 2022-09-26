import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "./Share.css"

export default function Share() {
    const user = useSelector(state => state.auth.user);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const shareHandle = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: "",
            likes: []
        };
        try {
            await axios.post("/", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <section className="container">
            <div className="wrapper">
                <div className="top">
                    <img src={`${PUBLIC_FOLDER}${user.profilePicture}`} alt="" className="top__img" />
                    <input type="text" className="top__input" placeholder="今何してるの？" ref={desc}/>
                </div>
                <hr className="hr"></hr>
                <form className="button" onSubmit={(e) => shareHandle(e)}>
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
                    <button className="button__share" type="submit">投稿</button>
                </form>
            </div>
        </section>
    )
}