// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import createUserRouter from "./routes/users.js";
import createAuthRouter from "./routes/auth.js";
import createPostsRouter from "./routes/posts.js";

const PORT = 3000;

// ミドルウェア（リクエストオブジェクトとレスポンスオブジェクトを受け取り、任意の処理を行う関数）
const app = express()
app.use(express.json()) // body-parserに基づいており、Expressに組み込まれているミドルウェア機能
app.use("/api/users", createUserRouter());
app.use("/api/auth", createAuthRouter());
app.use("/api/posts", createPostsRouter());

// DB接続
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DBと接続中...")})
    .catch((err) => {
        console.log(err)
    })


// // 第一引数にはエンドポイントを設定する
// // エンドポイントとはリクエストが実行される場所を指す
app.get("/", (req, res) => {
    res.send("hello express");
})

app.listen(PORT, () => console.log("サーバーが起動しました"))