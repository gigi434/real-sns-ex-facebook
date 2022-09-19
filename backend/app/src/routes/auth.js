// const router = require("express").Router()
import { Router } from "express";
import User from "../models/Users.js";


export default function createAuthRouter() {
    const router = Router();

    // ユーザー登録
    router.post("/register", async (req, res) => {
        try {
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })

            const user = await newUser.save();

            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err);
        }
    })

    // ログイン機能
    router.post("/login", async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if(!user) return res.status(404).send("ユーザーが見つかりません");

            // パスワードが等しければログイン処理を行う
            const vailedPassword = req.body.password === req.body.password;
            if(!vailedPassword) return res.status(400).send("パスワードが違います")

            return res.status(200).json(user);
            
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    // ユーザー情報閲覧
    router.get("/", (req, res) => {
        res.send("auth router");
    })

    return router;
    
};