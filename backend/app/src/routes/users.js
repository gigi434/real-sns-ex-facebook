// const router = require("express").Router()
import { Router } from "express";
import User from "../models/Users.js";


export default function createUserRouter() {
    const router = Router();

    // ユーザー情報の更新
    router.put("/:id", async (req, res) => { // :idにはランダムな文字列を入れることができる　利用例）ユーザーIDを渡してログイン
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                return res.status(200).json("ユーザー情報が更新されました");
            } catch (err) {
                return res.status(500).json(err);
            }

        } else {
            return res.status(403).json("アカウント情報が違います")
        }
    })

    // ユーザー情報の削除
    router.delete("/:id", async (req, res) => { // :idにはランダムな文字列を入れることができる　利用例）ユーザーIDを渡してログイン
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findByIdAndDelete(req.params.id);
                return res.status(200).json("ユーザー情報が削除されました");
            } catch (err) {
                return res.status(500).json(err);
            }

        } else {
            return res.status(403).json("アカウント情報が違います");
        }
    })

    // ユーザー情報の取得
    // router.get("/:id", async (req, res) => { // ユーザーのプロフィールなどは第三者からは見られるためuserIdでの認証はいらない
    //     try {
    //         const user = await User.findById(req.params.id);
    //         // ユーザーのパスワードや更新日付は取得されない方が良いため削除する
    //         const { password, updatedAt, ...other } = user._doc;
    //         return res.status(200).json(other);
    //     } catch (err) {
    //         return res.status(500).json(err);
    //     }
    // })

    // クエリによるユーザー情報の取得
    router.get("/", async (req, res) => { 
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });
            // ユーザーのパスワードや更新日付は取得されない方が良いため削除する
            const { password, updatedAt, ...other } = user._doc;
            return res.status(200).json(other);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    // ユーザーのフォロー
    router.put("/:id/follow", async (req, res) => {
        if (req.body.userId !== req.params.id) { //リクエストのユーザーIDと自分のIDが違うのであればフォローする
            try {
                const wantToFollowUser = await User.findById(req.params.id); // フォローする対象を探す
                const currentUser = await User.findById(req.body.userId); // 自分のアカウントを探す

                // フォローする対象のフォロー欄に自分のアカウントをフォローしていなければフォローする
                if (!wantToFollowUser.followers.includes(req.body.userId)) {
                    // updateとupdateOneの違いは条件に一致するドキュメントを更新するか、全てのドキュメントを更新するかである
                    await wantToFollowUser.updateOne({
                        $push: { 
                            followers: req.body.userId,
                        }
                    });
                    //　自分のアカウントのフォロー中にフォローする対象を格納する
                    await currentUser.updateOne({
                        $push: {
                            followings: req.params.id,
                        }
                    });

                    return res.status(200).json("フォローに成功しました")
                } else {
                    return res.status(403).json("あなたは既にフォローしています")
                }


            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(500).json("自身のアカウントはフォローできません。他の人のアカウントをフォローしてください")
        } 
    })

    // ユーザーのフォローを外す
    router.put("/:id/unfollow", async (req, res) => {
        if (req.body.userId !== req.params.id) { //リクエストのユーザーIDと自分のIDが違うことを確認する
            try {
                const wantToFollowUser = await User.findById(req.params.id); // フォローする対象を探す
                const currentUser = await User.findById(req.body.userId); // 自分のアカウントを探す
                
                // フォローする対象のフォロー欄に自分のアカウントをがあればフォローを外す
                if (wantToFollowUser.followers.includes(req.body.userId)) {
                    // フォロー対象者のフォロー欄から自分のアカウントを削除する
                    await wantToFollowUser.updateOne({
                        $pull: { 
                            followers: req.body.userId,
                        }
                    });
                    //　自分のアカウントのフォロー欄からフォロー対象者を削除する
                    await currentUser.updateOne({
                        $pull: {
                            followings: req.params.id,
                        }
                    });

                    return res.status(200).json("フォロー解除に成功しました")
                } else {
                    return res.status(403).json("あなたは対象者をフォローをしていません　フォローしている人を選択してください")
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(500).json("自身のアカウントはフォローできません。他の人のアカウントをフォローしてください")
        } 
    })


    
    // router.get("/", (req, res) => {
    //     res.send("user router");
    // })

    return router;
    
};