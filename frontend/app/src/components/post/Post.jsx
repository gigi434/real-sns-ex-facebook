import { MoreVert } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as timeago from "timeago.js"
import { useDispatch } from "react-redux";

import "./Post.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { likePost } from "../../store/modules/Post";

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length); // いいねボタンを押している人数
    const [isLiked, setIsLiked] = useState(false); //既にいいねボタンを押しているか
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // 投稿されたユーザー情報を一回だけ取得する
    const [postedUser, setPostedUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            // クエリを使用してuserIdとusernameからユーザー情報を取得する
            const response = await axios.get(`/users?userId=${post.userId}`);
            setPostedUser(response.data);
        }
        fetchUser();
    }, [post.userId])

    const handleLike = async () => {
        try {
            dispatch(likePost({ postId: post.id, userId: currentUser._id}))
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }


    return (
        <section className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left__profile">
                        <Link to={`/profile/${postedUser.username}`}>
                            <img src={`${PUBLIC_FOLDER}${postedUser.profilePicture}`} alt="" className="post-top-left__profileImg" />
                        </Link>
                        <span className="post-top-left__profileName">{postedUser.username}</span>
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