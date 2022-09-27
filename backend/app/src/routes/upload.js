import { Router } from "express";
import multer from "multer";

// どこに保存するのか設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });

export default function createUploadRouter() {
    const router = Router();

    router.post("/", upload.single("file"), async (req, res) => {
        try {
            return res.status(200).json("画像アップロード成功");
        } catch (err) {
            console.log(err);
        }
    })

    return router;
};