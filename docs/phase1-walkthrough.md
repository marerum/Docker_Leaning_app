# Docker Quest - Phase 1 ビルド記録

## 概要

Phase 1 基盤構築が完了 — RPGスタイルのゲーミフィケーション付きインタラクティブDocker & Docker Compose学習プラットフォーム。

**技術スタック:** Next.js 15 (App Router, Turbopack) + TypeScript + Vanilla CSS

## プロジェクト構造

```
docker-quest/
├── docs/                          ← プロジェクトドキュメント
│   ├── specification.md           ← 要件・仕様書 v3
│   ├── roadmap.md                 ← ロードマップ & 将来アーキテクチャ
│   ├── development-status.md      ← 開発ステータス
│   └── phase1-walkthrough.md      ← 本ファイル
├── src/
│   ├── app/
│   │   ├── globals.css            ← デザインシステム (ダークオーシャンテーマ)
│   │   ├── layout.tsx             ← ルートレイアウト + AppShell + フォント
│   │   ├── page.tsx               ← ホームページ (ヒーロー + コースカード)
│   │   ├── page.module.css
│   │   └── guide/[id]/
│   │       ├── page.tsx           ← チャプターガイドページ (ターミナル, クイズ)
│   │       └── guide.module.css
│   ├── components/layout/
│   │   ├── AppShell.tsx           ← メインラッパー (サイドバー + ヘッダー + XPバー)
│   │   ├── Header.tsx             ← ロゴ, OS切替, 言語切替, レベルバッジ
│   │   ├── Sidebar.tsx            ← ナビゲーション + ストリーク表示
│   │   └── XPBar.tsx              ← XP進捗フッター
│   └── lib/
│       ├── i18n/
│       │   ├── index.tsx          ← I18nProvider (ロケール + OS状態)
│       │   └── translations/
│       │       ├── ja.ts          ← 日本語翻訳
│       │       └── en.ts          ← 英語翻訳
│       ├── store/
│       │   └── index.ts           ← UserProgressStore + LocalStorage実装
│       └── content/
│           └── chapters.ts        ← チャプターデータ (3章, バイリンガル)
```

## 実装済み機能

### 🎨 デザインシステム
- ダークオーシャンテーマ (シアン/インディゴアクセント)
- グラスモーフィズムエフェクト、グローアニメーション
- CSS カスタムプロパティによる一貫したテーマ管理
- Google Fonts: Inter, Noto Sans JP, JetBrains Mono

### 🌐 i18n + OS切替
- **言語:** 日本語 (デフォルト) / 英語
- **OS切替:** Windows / macOS — ターミナルプロンプト、インストール手順、パス表記が切り替わる
- ユーザーエージェントからOS自動検出 (初回訪問時)
- LocalStorageに保存

### 📊 データアクセス層
- `UserProgressStore` インターフェース (8メソッド) — 将来のDB移行に対応
- MVP向けLocalStorage実装
- 30レベル進行テーブル付きXP計算
- デイリーアクティビティ記録によるストリーク追跡

### 🏠 ホームページ
- アニメーション付きヒーローセクション
- プログレスバー付き3レベルコースカード
- 機能ハイライトグリッド
- パルスグローアニメーション付きCTAボタン

### 📖 ガイドページ (コア学習体験)
- **イントロセクション:** 概要、「なぜ学ぶか」、Before/After比較カード
- **ゴールチェックリスト:** 章の目標一覧
- **コンセプトセクション:** テーブル/コードブロック付き教育コンテンツ
- **シミュレーションターミナル:** インタラクティブコマンド入力、コマンドマッチング、出力表示、ヒントシステム、XP付与
- **ローカル実践:** OS対応ターミナルプロンプト (PS> vs $)、クリップボードコピーボタン
- **チェックポイントクイズ:** 回答フィードバック (正解/不正解ハイライト)、解説、XP付与による章完了

### 📦 チャプターコンテンツ (12章中3章完了)
1. **Dockerって何？** — コンテナ vs VM、`docker version`/`docker info`
2. **はじめてのコンテナ** — イメージとコンテナ、`docker run hello-world`
3. **コンテナを操る** — ライフサイクルコマンド、`-d` フラグ、`docker ps/stop/rm`

## ビルド検証結果

```
✓ TypeScript チェック: エラー 0件
✓ ビルド: Next.js (Turbopack) — 正常完了
✓ ルート: / (静的), /guide/[id] (動的)
```

## アプリの起動方法

```powershell
cd docker-quest
npm run dev
# → http://localhost:3000
```

## Git リポジトリ

- **GitHub:** https://github.com/marerum/Docker_Leaning_app.git
- **ブランチ:** `master`
