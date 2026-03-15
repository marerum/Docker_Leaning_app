# Docker Quest — Vercel デプロイ手順書（MVP）

> 作成日: 2026-03-15
> 対象フェーズ: Phase 1 MVP（LocalStorage完結・認証なし）
> 関連: [roadmap.md](../../roadmap.md) §Phase 2 / [development-status.md](../../development-status.md)

---

## 1. なぜ Vercel にデプロイするのか

### 1.1 技術的な理由

Docker Quest は **Next.js 15 (App Router)** で構築されている。Vercel は Next.js の開発元であり、以下の点で他のホスティングサービスより優位性がある。

| 観点 | Vercel | 他サービス（Netlify / GitHub Pages 等） |
|------|--------|-----------------------------------------|
| **Next.js 最適化** | ✅ 自動対応（SSG/SSR/ISR/Edge Functions） | △ 追加設定が必要 |
| **ビルドパイプライン** | ✅ `next build` を自動検出・実行 | △ 手動設定 |
| **GitHub連携** | ✅ Push → 自動デプロイ | ✅ 対応あり |
| **プレビュー環境** | ✅ PRごとに自動生成 | △ 別途設定 |
| **グローバルCDN** | ✅ Edge Network（高速配信） | ○ 対応あり |
| **セキュリティヘッダー** | ✅ `next.config.ts` の設定をそのまま反映 | ○ 対応あり |

### 1.2 コスト面の理由

現フェーズ（MVP）では**Hobby プランで無料**で運用できる。

| プラン | 月額 | 制限 | フェーズ |
|--------|------|------|---------|
| **Hobby（無料）** | ¥0 | 個人プロジェクト・商用利用不可 | Phase 1 MVP |
| **Pro** | ~$20/月 | 商用利用OK・チーム機能 | Phase 2〜（有料化時） |

> [!NOTE]
> Hobby プランは「商用利用不可」の制約がある。有料プランを導入する Phase 3 以降では Pro プランへの移行が必要。

### 1.3 戦略的な理由

- **最速でユーザーに届けられる**: アカウント作成〜公開まで**15〜30分**で完了
- **将来の認証・DB連携に対応**: Phase 2 で Supabase を追加する際もVercel + Supabase は相性が良い（[roadmap.md §Phase 2](../../roadmap.md) 参照）
- **ユーザーの声を早期収集**: 完璧を待たず公開してフィードバックを得る（社長・PdM方針）

---

## 2. 前提条件

デプロイ前に以下がすべて満たされていることを確認する。

### 2.1 アプリケーション側

- [ ] `npm run build` がエラー0件で完了すること
- [ ] セキュリティヘッダーが `next.config.ts` に設定済みであること ✅ 2026-03-15 完了
- [ ] プライバシーポリシーページ（`/privacy`）が存在すること ✅ 2026-03-15 完了
- [ ] `next.config.ts` に本番環境で問題になる設定がないこと

### 2.2 外部サービス

- [ ] GitHubアカウント（リポジトリ: `https://github.com/marerum/Docker_Leaning_app`）
- [ ] Vercelアカウント（未作成の場合は手順3で作成）

---

## 3. Vercel アカウント作成

1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」→ **「Continue with GitHub」** を選択
   - GitHubアカウントと紐づけることで、リポジトリの自動連携が可能になる
3. プラン選択画面で **「Hobby」** を選択（無料）
4. 名前を入力して完了

---

## 4. プロジェクトのインポートとデプロイ

### Step 1: 新規プロジェクト作成

Vercel ダッシュボードで **「Add New... → Project」** をクリック。

### Step 2: GitHubリポジトリを連携

1. 「Import Git Repository」で `Docker_Leaning_app` を検索
2. リポジトリが表示されたら **「Import」** をクリック

### Step 3: プロジェクト設定

| 設定項目 | 値 | 備考 |
|---------|-----|------|
| **Framework Preset** | `Next.js` | 自動検出される |
| **Root Directory** | `/`（デフォルト） | GitHubリポジトリのルートが `docker-quest` の内容のため変更不要 |
| **Build Command** | `npm run build` | デフォルトのまま |
| **Output Directory** | `.next` | デフォルトのまま |
| **Install Command** | `npm install` | デフォルトのまま |

> [!NOTE]
> GitHubリポジトリのルートがすでに `docker-quest` の内容（`src/`, `package.json` 等）になっているため、Root Directory はデフォルト（`/`）のままでよい。

### Step 4: 環境変数

現時点（Phase 1 MVP）では**環境変数の設定は不要**。
将来フェーズで追加が必要になる環境変数:

| 変数名 | 追加フェーズ | 用途 |
|--------|------------|------|
| `NEXTAUTH_SECRET` | Phase 2 | NextAuth.js 認証 |
| `NEXTAUTH_URL` | Phase 2 | 本番URL |
| `DATABASE_URL` | Phase 2 | Supabase PostgreSQL |
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 2 | Supabase クライアント |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 2 | Supabase クライアント |
| `STRIPE_SECRET_KEY` | Phase 3 | 課金処理 |

### Step 5: デプロイ実行

「**Deploy**」ボタンをクリック。ビルドログがリアルタイムで表示される。
初回ビルドは **2〜5分** 程度かかる。

---

## 5. デプロイ後の確認チェックリスト

デプロイ完了後、以下を順に確認する。

### 5.1 基本動作

- [ ] ホームページ（`/`）が表示される
- [ ] ガイドページ（`/guide/1`）が開ける
- [ ] 辞書ページ（`/dictionary`）が開ける
- [ ] 演習ページ（`/practice`）が開ける
- [ ] **進捗ダッシュボード**（`/progress`）が表示される
- [ ] **プライバシーポリシー**（`/privacy`）が表示される
- [ ] サイドバーのナビゲーションが機能する

### 5.2 機能動作

- [ ] ガイドページでシミュレーション演習が動作する（コマンド入力 → 出力表示）
- [ ] チェックポイントクイズが動作し、XPが加算される
- [ ] 言語切替（JP/EN）が機能する
- [ ] OS切替（Win/Mac）が機能する
- [ ] XPバー（フッター）にデータが表示される
- [ ] ページを閉じて再度開いたとき、進捗が保持されている（LocalStorage動作確認）

### 5.3 セキュリティヘッダー確認

ブラウザの DevTools → Network → 任意のリクエスト → Response Headers で以下を確認:

```
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

または以下のコマンドで確認（`<your-app>.vercel.app` を実際のURLに置換）:

```bash
curl -I https://<your-app>.vercel.app | grep -E "x-frame|x-content|referrer"
```

---

## 6. 自動デプロイの仕組み

設定完了後は、GitHubへの Push が自動的にデプロイをトリガーする。

```
git push origin master
      ↓
Vercel がPushを検知
      ↓
自動ビルド（npm run build）
      ↓
成功 → 本番環境に反映（~2分）
失敗 → ビルドログで原因確認・本番は維持
```

**プレビューデプロイ（PR作成時）**:
Pull Request を作成すると、Vercel が自動的にプレビュー用URLを生成する。本番に影響を与えずに変更を確認できる。

---

## 7. カスタムドメイン（オプション）

独自ドメインを使用する場合:

1. Vercel ダッシュボード → Project → **Settings → Domains**
2. ドメインを入力して「Add」
3. DNSレコードを追加（Vercelが指示するCNAMEまたはAレコード）
4. SSL証明書は**Vercelが自動発行**（Let's Encrypt）

---

## 8. トラブルシューティング

| 症状 | 原因 | 対処 |
|------|------|------|
| ビルドエラー | `package.json` が見つからない | GitHubにリポジトリのルートから正しくpushされているか確認 |
| 404エラー | 動的ルート（`/guide/[id]`）が機能しない | Next.js の設定を確認（通常は自動解決） |
| LocalStorageが空 | ブラウザのシークレットモード | 通常モードで確認 |
| セキュリティヘッダーがない | `next.config.ts` の設定ミス | `headers()` の設定を確認 |

---

## 9. 次のステップ（Phase 2へ）

MVP公開後、ユーザーのフィードバックを受けながら以下を進める。
詳細は [roadmap.md §Phase 2](../../roadmap.md) を参照。

1. **ユーザー数・フィードバック収集** — 目標: 100ユーザー
2. **認証基盤（NextAuth.js + Supabase Auth）の導入**
3. **LocalStorage → クラウドDB（Supabase PostgreSQL）への移行**
4. **Vercel Hobby → Pro へのアップグレード**（商用利用開始時）
