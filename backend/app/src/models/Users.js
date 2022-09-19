import mongoose from "mongoose";

// ユーザースキーマを定義する
// スキーマとはデータベースの構造のことであり、ここでは概念スキーマを定義する

// スキーマとは・・・スキーマ（schema）とは、データベースの構造やデータの格納形式などのメタデータを定義したもの　テーブル定義＝スキーマ定義
// 売上テーブルがどこに補完されているのか、商品名やIDはどの様な形式で保存されているのかを定義している
// メタデータとは・・・メタデータとは、データの定義をしたデータです。あるデータに関するデータの形式、意味内容、格納場所などの情報のこと
// http://www.kogures.com/hitoshi/webtext/db-schema/index.html

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 25,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    profilePicture: { // profileの画像パス
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        defalt: [],
    },
    followings: {
        type: Array,
        defalt: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 70,
    },
    city: {
        type: String,
        max: 50,
    },
},

    { timestamps: true}, // データを格納した日付を自動的に格納するか
);

// .modelメソッドを使用することでスキーマのコピーとなるモデルを作成する必要がある
// https://mongoosejs.com/docs/guide.html#models
const User = mongoose.model('User', UserSchema);

export default User;