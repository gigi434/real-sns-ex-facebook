import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Timeline.css";
import Share from "../share/Share";
import Post from "../post/Post";

export default function Timeline({ username }) {
    const [posts, setPosts] = useState([]);

    // timelineの取得を一回だけ実行する
    useEffect(() => {
        const fetchPosts = async () => {
            const response = username 
                ? await axios.get(`/posts/profile/${username}`)
                : await axios.get("/posts/timeline/6314be3ce9738babfe4fa4fd");
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
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