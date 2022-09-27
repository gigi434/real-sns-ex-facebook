// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import createUserRouter from "./src/routes/users.js";
import createAuthRouter from "./src/routes/auth.js";
import createPostsRouter from "./src/routes/posts.js";
import createUploadRouter from "./src/routes/upload.js"

const PORT = 3000;

// ESModuleを用いて__dirnameを利用する
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ミドルウェア（リクエストオブジェクトとレスポンスオブジェクトを受け取り、任意の処理を行う関数）
const app = express()
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json()) // body-parserに基づいており、Expressに組み込まれているミドルウェア機能
app.use("/api/users", createUserRouter());
app.use("/api/auth", createAuthRouter());
app.use("/api/posts", createPostsRouter());
app.use("/api/upload", createUploadRouter());

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