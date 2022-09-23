import { MoreVert } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as timeago from "timeago.js"

import "./Post.css"
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length); // いいねボタンを押している人数
    const [isLiked, setIsLiked] = useState(false); //既にいいねボタンを押しているか
    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }

    // 自身のユーザー情報を一回だけ取得する
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            // クエリを使用してuserIdとusernameからユーザー情報を取得する
            const response = await axios.get(`/users?userId=${post.userId}`);
            setUser(response.data);
        }
        fetchUser();
    }, [])

    return (
        <section className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left__profile">
                        <Link to={`/profile/${user.username}`}>
                            <img src={`${PUBLIC_FOLDER}${user.profilePicture}`} alt="" className="post-top-left__profileImg" />
                        </Link>
                        <span className="post-top-left__profileName">{user.username}</span>
                        <span className="post-top-left__postedDate">{timeago.format(post.createdAt)}</span>
                    </div>
                    <div className="top-right__option">
                        <MoreVert />
                    </div>
                </div>
                <div className="post-center">
                    <span className="post-center__text">{post.desc}</span>
                    <img src={PUBLIC_FOLDER + post.img} alt="" className="post-center__img" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className="post-bottom-left__likeIcon" onClick={() => handleLike()}/>
                        <span className="post-bottom-left__likeCounter">{like}人がいいねを押しました</span>
                    </div>
                    <div className="post-bottom-right">
                        <span className="post-bottom-right__commentText">{post.comment}コメント</span>
                    </div>
                </div>
            </div>
        </section>
    )
}