import { response, Router } from "express";

import Post from "../models/Post.js";
import User from "../models/Users.js";

export default function createPostsRouter() {
    const router = Router();
    
    // 投稿（twitterにあたるtweet）を作成する
    router.post("/", async (req, res) => {
        const newPost = new Post(req.body);

        try {
            // 新しいドキュメントをデータベースに挿入してドキュメントを保存する
            // https://mongoosejs.com/docs/api.html#document_Document-save
            const savedPost = await newPost.save();

            return res.status(200).json(savedPost);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    // 投稿を編集する
    router.put("/:id", async (req, res) => {
        try {
            // 投稿をidから探す
            const post = await Post.findById(req.params.id);

            // 投稿を実行した人と投稿を編集する人が同じであれば編集する
            if (post.userId === req.body.userId) { 
                await post.updateOne({
                    // $set演算子は、指定された値でフィールドをインクリメントする　
                    $set: req.body,
                })
                return res.status(200).json("投稿編集に成功しました");
            } else {
                res.status(403).json("他の人の投稿を編集することはできません")
            }
        } catch (err) {
            return res.status(403).json(err);
        }
    })

    // 投稿を削除する
    router.delete("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if(post.userId === req.body.userId) {
                await post.deleteOne();
                return res.status(200).json("投稿削除が完了しました");
            } else {
                return res.status(403).json("他品の投稿は削除できません");
            }
        } catch (err) {
            return res.status(403).json(err);
        }
    })


    // 特定の投稿を一つだけ取得する
    router.get("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            return res.status(200).json(post);
        } catch (err) {
            return res.status(200).json(err);
        }
    })


    // 特定の投稿にいいねを押す
    router.put("/:id/like", async (req, res) => {
        try {
            const wantToPost = await Post.findById(req.params.id); // いいねする投稿を探す

            // まだ自身のアカウントが特定の投稿にいいねを押していなければ
            if (!wantToPost.likes.includes(req.body.userId)) {
                // いいねを押す
                await wantToPost.updateOne({
                    $push: { 
                        likes: req.body.userId,
                    }
                });

                return res.status(200).json("投稿にいいねを押しました");

            // 既に自身のアカウントがいいねを押していれば
            } else {
                await wantToPost.updateOne({
                    $pull: {
                        likes: req.body.userId,
                    }
                });
                return res.status(200).json("投稿にいいねを解除しました");
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    })

    //  プロフィール画面で自身の投稿だけを取得する
    router.get("/profile/:username", async (req, res) => {
        try {
            // 自分の投稿を取得
            const currentUser = await User.findOne({ username: req.params.username });
            const currentUserPosts = await Post.find({ userId: currentUser._id});

            return res.status(200).json(currentUserPosts);
        } catch (err) {
            return res.status(500).json(err);
        }
    })


    // タイムラインの投稿を取得
    router.get("/timeline/:userId", async (req, res) => {
        try {
            // 自分の投稿を取得
            const currentUser = await User.findById(req.params.userId);
            const currentUserPosts = await Post.find({ userId: currentUser._id});
            // フォロー中のアカウントの投稿を取得
            const followedUserPosts = await Promise.all( // 反復可能な引数を渡し、渡されたpromiseオブジェクトがfullfiledかつpromiseオブジェクト以外の処理が正常に実行された時に単一のPromiseオブジェクトを返す
                currentUser.followings.map(followedUserId => {
                    return Post.find({ userId: followedUserId})
                })
            );
            // const timelinePosts = [ ...currentUserPosts, ...followedUserPosts ];
            // return res.status(200).json(timelinePosts);
            return res.status(200).json(currentUserPosts.concat(...followedUserPosts));
        } catch (err) {
            return res.status(500).json(err);
        }
    })


    return router;
};