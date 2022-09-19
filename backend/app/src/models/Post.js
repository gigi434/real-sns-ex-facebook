import mongoose from "mongoose";

// モデルからドキュメントを作成する際に自動的に一意の文字列な値を取る_idプロパティをmongooseが定義する
// https://mongoosejs.com/docs/guide.html#_id

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 200,
    },
    img: {
        type: String, // 画像へのpath
    },
    likes: {
        type: Array,
        default: [],
    },
},

{
    timestamps: true
},
)

const Post = mongoose.model('Post', PostSchema);

export default Post;