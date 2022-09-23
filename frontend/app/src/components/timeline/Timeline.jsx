import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./Timeline.css";
import Share from "../share/Share";
import Post from "../post/Post";

export default function Timeline({ username }) {
    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.auth.user);

    // timelineの取得を一回だけ実行する
    useEffect(() => {
        const fetchPosts = async () => {
            const response = username 
                ? await axios.get(`/posts/profile/${username}`) //プロフィール画面を表示した場合
                : await axios.get(`/posts/timeline/${user._id}`); // ホーム画面を表示した場合
            setPosts(response.data);
        }
        fetchPosts();
    }, [username, user._id])
    return (
        <section className="timeline">
            <div className="timeline-wrapper">
                <Share />
                {posts.map((post) => {
                    return <Post post={post} key={post._id}/>
                })}
            </div>
        </section>
    )
}