# 🐳 Docker Quest

**楽しく学ぶ Docker & Docker Compose** — インタラクティブ学習プラットフォーム

> ハンズオン形式でDockerの基礎からDocker Composeまでをマスターできる、ゲーミフィケーション搭載のWebアプリケーションです。

## ✨ 特徴

- **🖥️ シミュレーションターミナル** — ブラウザ内でDockerコマンドを安全に練習
- **🌐 多言語対応** — 日本語 / English
- **💻 OS対応** — Windows / macOS のコマンド差異を自動表示
- **📊 ゲーミフィケーション** — XP・レベル・バッジで学習を可視化
- **📖 12章のカリキュラム** — Docker基礎 → Dockerfile → Docker Compose

## 📚 カリキュラム

| Level | 内容 | チャプター |
|-------|------|-----------|
| **Lv.1** Docker基礎 | コンテナの基本操作 | Ch.1〜6 |
| **Lv.2** Dockerfile & イメージ | イメージ構築・最適化 | Ch.7〜9 |
| **Lv.3** Docker Compose | マルチサービス構成 | Ch.10〜12 |

## 🛠️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Dark Theme)
- **Data**: LocalStorage (MVP) → Supabase (将来)

## 🚀 セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:3000 でアクセスできます。

## 📁 ディレクトリ構成

```
docker-quest/
├── docs/               # 仕様書・ロードマップ
├── public/             # 静的ファイル
└── src/
    ├── app/            # Next.js App Router ページ
    │   ├── guide/      # メインカリキュラム
    │   ├── practice/   # 実践演習 (Coming Soon)
    │   ├── dictionary/ # コマンド辞典 (Coming Soon)
    │   ├── challenge/  # チャレンジ (Coming Soon)
    │   └── progress/   # 進捗 (Coming Soon)
    ├── components/     # UIコンポーネント
    └── lib/
        ├── content/    # チャプターデータ
        ├── i18n/       # 多言語対応
        └── store/      # データ永続化
```

## 📄 ライセンス

Private
