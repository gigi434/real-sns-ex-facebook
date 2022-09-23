import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, userParams } from "react-router-dom";

import "./Profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import Rightbar from "../../components/rightbar/Rightbar";


export default function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    
    // 自身のユーザー情報を一回だけ取得する
    const [user, setUser] = useState({});
    const username = useParams().username;
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users/?username=${username}`);
            setUser(response.data);
        }
        fetchUser();
    }, [])

    return (
        <>
            <div className="profile-container">
                <Topbar />
                <div className="profile-wrapper">
                    <Sidebar />
                    <div className="profile-item">
                        <div className="profile-detail">
                            <img
                                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"} 
                                alt="" 
                                className="profile-detail__coverImg"
                            />
                            <img
                                src={user.profilePicture}
                                alt="" 
                                className="profile-detail__userImg" 
                            />
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-info__name">{user.username}</h4>
                            <span className="profile-info__desc">{user.desc}</span>
                        </div>
                        <div className="profile-bottom">
                            <Timeline username={username} />
                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}