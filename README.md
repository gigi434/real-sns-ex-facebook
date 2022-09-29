# real-sns-ex-facebook

## プロジェクト概略

facebook のような SNS

---

## 要件

- Docker: 20.10.17
- git: 2.37.0
- MongoDB(クラウドサービス利用)

---

## 利用方法

```
 1. cd real-sns-ex-facebook
 2. docker-compose up -d
 - フロントエンド
   1. docker-compose -f docker-compose.dev.yaml exec frontend sh
   2. npm ci
   3. npm run dev
 - バックエンド
   1. docker-compose -f docker-compose.dev.yaml exec backendend sh
   2. npm ci
   3. npm run start
```

---

## ライセンス

[MIT](https://opensource.org/licenses/MIT)
