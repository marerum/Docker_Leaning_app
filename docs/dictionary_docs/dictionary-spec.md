# Docker Quest — コマンド・用語辞書 仕様書

> 最終更新: 2026-03-07  
> 対象範囲: Level 1（Docker基礎）・Level 2（Dockerfile & イメージ）

---

## 1. 概要

Docker Quest のメインカリキュラム（シミュレーション学習）で登場する**用語・コマンド・Dockerfile命令**を体系的にまとめた辞書機能。初学者がいつでも参照でき、カリキュラムと辞書を双方向にリンクして学習の行き来を可能にする。

### 1.1 目的
- カリキュラム学習中に分からない用語をすぐに調べられる
- 用語の「解説」と「利用例」をセットで提供し、実践的な理解を促進
- メインコンテンツとの双方向リンクで学習コンテキストを維持

### 1.2 画面イメージ

> ※ 以下のモックアップを参照（ダークオーシャンテーマに統一）

![辞書ページ UIモックアップ](dictionary-mockup.png)

---

## 2. カテゴリ体系

Lv区分ではなく、**用途別の階層構造**でカテゴリを組み立てる。

```
 辞書
├── 📖 概念・関連用語
│   ├── 基本用語
│   │   ├── コンテナ一般の概念  … コンテナ, イメージ, ライフサイクル, ポートマッピング, ボリューム, バインドマウント
│   │   └── Docker の基本概念    … Docker, Docker Hub, nginx
│   ├── Dockerfile       … Dockerfile, .dockerignore
│   ├── Dockerfile命令   … FROM, RUN, COPY, CMD, WORKDIR, COPY --from
│   └── Docker Image     … レイヤー, タグ, ベースイメージ, マルチステージビルド等
│
└── 💻 コマンド
    ├── メインコマンド
    │   ├── システム情報      … docker version, docker info
    │   ├── コンテナ操作      … docker run, docker ps, docker stop, docker rm, docker exec
    │   ├── ボリューム操作    … docker volume create, docker volume ls
    │   └── イメージ操作      … docker build, docker images, docker history
    └── オプション
        ├── コンテナ実行オプション  … -d, -it, -p, -v, -a, --name
        └── ビルドオプション        … -t, -f
```

### 2.1 TypeScript 定義

```typescript
// カテゴリ（大分類）
type DictMainCategory = 'concept' | 'command';

// サブカテゴリ
type DictSubCategory =
  // concept 配下
  | 'basic'           // 基本用語
  | 'dockerfile'      // Dockerfile
  | 'dockerfile-cmd'  // Dockerfile命令
  | 'docker-image'    // Docker Image
  // command 配下
  | 'main-command'    // メインコマンド
  | 'option';         // オプション

export interface DictionaryEntry {
  id: string;                    // ユニークID（slug形式）
  term: { ja: string; en: string };
  mainCategory: DictMainCategory;
  subCategory: DictSubCategory;
  firstChapterId: number;        // 初出チャプターID（双方向リンク用）
  summary: { ja: string; en: string };     // 1行の概要説明
  description: { ja: string; en: string }; // 詳細解説（Markdown可）
  examples: { ja: string; en: string };    // 利用例（コードブロック）
  relatedTerms?: string[];       // 関連用語のID配列
}
```

---

## 3. 全エントリ一覧（カテゴリ別）

### 📖 概念・関連用語

#### 基本用語

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `docker` | Docker | Ch.1 | コンテナ仮想化プラットフォーム |
| `container` | コンテナ / Container | Ch.1 | アプリとその実行環境をまとめた軽量な実行単位 |
| `image` | イメージ / Image | Ch.2 | コンテナの元となる読み取り専用テンプレート |
| `docker-hub` | Docker Hub | Ch.7 | Docker公式のイメージレジストリ（共有サイト） |
| `volume` | ボリューム / Volume | Ch.6 | Dockerが管理するデータ永続化領域 |
| `bind-mount` | バインドマウント / Bind Mount | Ch.6 | ホストのフォルダをコンテナに直接接続する方式 |
| `port-mapping` | ポートマッピング / Port Mapping | Ch.5 | ホストとコンテナのポートを接続する仕組み |
| `lifecycle` | コンテナライフサイクル / Container Lifecycle | Ch.3 | 作成→起動→停止→削除の一連の流れ |
| `nginx` | nginx | Ch.3 | 軽量Webサーバー。本カリキュラムの練習用イメージ |

#### Dockerfile

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `dockerfile` | Dockerfile | Ch.7 | Dockerイメージの設計図（テキストファイル） |
| `dockerignore` | .dockerignore | Ch.8 | ビルド時に除外するファイルを指定する設定ファイル |

#### Dockerfile命令

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `df-from` | FROM | Ch.7 | ベースイメージを指定（Dockerfileの最初の命令） |
| `df-run` | RUN | Ch.7 | イメージビルド時にコマンドを実行 |
| `df-copy` | COPY | Ch.7 | ホストのファイルをイメージにコピー |
| `df-workdir` | WORKDIR | Ch.7 | 作業ディレクトリを設定 |
| `df-cmd` | CMD | Ch.7 | コンテナ起動時のデフォルトコマンドを指定 |
| `df-copy-from` | COPY --from | Ch.9 | マルチステージビルドで別ステージからファイルをコピー |

#### Docker Image

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `base-image` | ベースイメージ / Base Image | Ch.7 | FROMで指定する土台となるイメージ |
| `tag` | タグ / Tag | Ch.7 | イメージのバージョンを識別するラベル（例: `node:18-alpine`） |
| `layer` | レイヤー / Layer | Ch.8 | Dockerfileの各命令が生成するイメージの構成単位 |
| `build-cache` | ビルドキャッシュ / Build Cache | Ch.8 | レイヤー単位で再利用される高速ビルドの仕組み |
| `multi-stage-build` | マルチステージビルド / Multi-Stage Build | Ch.9 | ビルドと実行を分離し軽量イメージを作る手法 |

---

### 💻 コマンド

#### メインコマンド

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `docker-version` | docker version | Ch.1 | Dockerのバージョン情報を表示 |
| `docker-info` | docker info | Ch.1 | Docker環境の詳細情報を表示 |
| `docker-run` | docker run | Ch.2 | イメージからコンテナを作成・起動 |
| `docker-ps` | docker ps | Ch.2 | コンテナの一覧を表示 |
| `docker-stop` | docker stop | Ch.3 | 稼働中のコンテナを停止 |
| `docker-rm` | docker rm | Ch.3 | コンテナを削除 |
| `docker-exec` | docker exec | Ch.4 | 稼働中のコンテナ内でコマンドを実行 |
| `docker-volume-create` | docker volume create | Ch.6 | ボリュームを作成 |
| `docker-volume-ls` | docker volume ls | Ch.6 | ボリューム一覧を表示 |
| `docker-build` | docker build | Ch.7 | Dockerfileからイメージをビルド |
| `docker-images` | docker images | Ch.7 | ローカルのイメージ一覧を表示 |
| `docker-history` | docker history | Ch.8 | イメージのレイヤー履歴を表示 |

#### オプション

| ID | 用語（ja/en） | 初出 | 概要 |
|---|---|---|---|
| `opt-d` | -d (detach) | Ch.3 | コンテナをバックグラウンドで実行 |
| `opt-it` | -it (interactive + TTY) | Ch.4 | コンテナに対話モードで接続 |
| `opt-p` | -p (port) | Ch.5 | ホスト:コンテナのポートマッピングを設定 |
| `opt-v` | -v (volume) | Ch.6 | ボリュームまたはバインドマウントを設定 |
| `opt-a` | -a (all) | Ch.2 | docker ps で停止中のコンテナも表示 |
| `opt-name` | --name | Ch.3 | コンテナに名前を付ける |
| `opt-t` | -t (tag) | Ch.7 | docker build時にイメージ名:タグを指定 |
| `opt-f` | -f (file) | Ch.9 | 使用するDockerfileを指定 |

---

## 4. 一覧表示と切替仕様

### 4.1 表示モード切替

辞書ページのヘッダー部に**2つの表示切替ボタン**を配置する。

| モード | ラベル（ja） | ラベル（en） | 説明 |
|---|---|---|---|
| **カテゴリ別** | 📂 カテゴリ別 | 📂 By Category | カテゴリ階層でグループ表示（デフォルト） |
| **アルファベット順** | 🔤 アルファベット順 | 🔤 Alphabetical | 数字→A-Z→あ-ん の昇順で全件フラット表示 |

### 4.2 カテゴリ別表示

```
📖 概念・関連用語
  ▸ 基本用語 (9)
    Docker, コンテナ, イメージ, Docker Hub, ボリューム, ...
  ▸ Dockerfile (2)
    Dockerfile, .dockerignore
  ▸ Dockerfile命令 (6)
    FROM, RUN, COPY, WORKDIR, CMD, COPY --from
  ▸ Docker Image (5)
    ベースイメージ, タグ, レイヤー, ビルドキャッシュ, マルチステージビルド

💻 コマンド
  ▸ メインコマンド (12)
    docker version, docker info, docker run, docker ps, ...
  ▸ オプション (8)
    -a, -d, -f, -it, --name, -p, -t, -v
```

- 大分類（📖 / 💻）は常時展開
- サブカテゴリはクリックで折りたたみ / 展開
- サブカテゴリ名の右に件数バッジ表示

### 4.3 アルファベット順表示

- 全エントリをフラットに1列リスト表示
- ソート順: **数字 → アルファベット(A-Z) → ひらがな/カタカナ(あ-ん)**
- 例: `-a`, `-d`, `-f`, ..., `COPY`, `CMD`, ..., `docker build`, `docker exec`, ..., `nginx`, ..., `コンテナ`, `タグ`, `ボリューム`, ...
- 頭文字ごとにセクション区切りヘッダーを表示（例: `— D —`, `— N —`, `— コ —`）

---

## 5. 画面構成

### 5.1 サイドバー（検索窓付き）

```
📖 メインカリキュラム     ▸
📚 コマンド辞書           ▾ (選択中・ハイライト)
   ┌─────────────────────┐
   │ 🔍 用語を検索...     │  ← 検索窓
   └─────────────────────┘
📊 進捗
🏆 チャレンジ
```

**検索窓の仕様:**
- 「コマンド辞書」直下に常時表示
- インクリメンタルサーチ（入力中にリアルタイムフィルタリング）
- 検索対象: 用語名（ja/en）、概要テキスト
- 検索結果はメインエリアの辞書一覧に即座に反映
- 表示モード（カテゴリ別 / アルファベット順）と AND 条件で連動

### 5.2 メインコンテンツエリア

#### ヘッダー部
```
📚 Docker コマンド・用語辞書

[📂 カテゴリ別]  [🔤 アルファベット順]   ← 表示切替トグル
```

#### 辞書カード（一覧）

```
┌─────────────────────────────────────────────────────┐
│  docker run               [メインコマンド]    [Ch.2] │
│  イメージからコンテナを作成・起動する基本コマンド       │
│                                            ▸ 詳細   │
└─────────────────────────────────────────────────────┘
```

#### 辞書カード（展開時・詳細ビュー）

```
┌─────────────────────────────────────────────────────┐
│  docker run               [メインコマンド]    [Ch.2] │
│                                                     │
│  📖 解説                                            │
│  イメージからコンテナを作成し、起動するコマンド。       │
│  Docker で最も基本的かつ最も使用頻度の高いコマンド。    │
│  イメージがローカルにない場合は自動的にDocker Hub     │
│  からダウンロード（pull）して起動する。                │
│                                                     │
│  💻 利用例                                          │
│  ┌────────────────────────────────────────────┐     │
│  │ # 基本                                     │     │
│  │ docker run hello-world                     │     │
│  │                                            │     │
│  │ # バックグラウンドでnginx起動               │     │
│  │ docker run -d nginx                        │     │
│  │                                            │     │
│  │ # ポートマッピング + バックグラウンド        │     │
│  │ docker run -d -p 8080:80 nginx             │     │
│  │                                            │     │
│  │ # 対話モード                               │     │
│  │ docker run -it ubuntu bash                 │     │
│  └────────────────────────────────────────────┘     │
│                                                     │
│  📍 初出: Ch.2 はじめてのコンテナ  →                  │
│     ↑ クリックで該当チャプターへ遷移                   │
│                                                     │
│  🔗 関連: -d (detach), -p (port), -it, docker ps    │
└─────────────────────────────────────────────────────┘
```

---

## 6. 双方向リンク仕様

### 6.1 辞書 → カリキュラム（初出チャプターリンク）

- 各辞書エントリに `firstChapterId` を持つ
- 詳細ビューに「📍 初出: Ch.N 〈チャプター名〉」リンクを表示
- クリックで `/guide/{chapterId}` へ遷移し、コンセプト解説セクションにスクロール

### 6.2 カリキュラム → 辞書（用語リンク）

- チャプターのコンセプト解説テキスト内で、辞書に登録されている用語を**自動リンク化**
- リンクのスタイル: 下線付きアクセントカラー、ホバーでツールチップ（概要表示）
- クリックで `/commands` へ遷移し、該当エントリを展開表示
- コードブロック (`<pre><code>`) 内の用語はリンク化しない

---

## 7. ページ・ルーティング構成

| パス | 用途 |
|---|---|
| `/dictionary` | 辞書一覧ページ（カテゴリ別/アルファベット順切替・検索・展開詳細） |
| `/dictionary?q=xxx` | 検索状態を保持したURL |

---

## 8. 実装ファイル構成

```
src/
├── lib/content/
│   └── dictionary.ts          [NEW]  辞書データ定義（全エントリ + カテゴリ定数）
├── app/commands/
│   └── page.tsx               [MODIFY] 辞書ページ（Coming Soon → 実装）
├── components/layout/
│   └── Sidebar.tsx            [MODIFY] 検索窓を追加
└── app/guide/[id]/
    └── page.tsx               [MODIFY] renderMarkdown に辞書リンク処理追加
```

---

## 9. 検索機能仕様

### 検索対象
- `term.ja` / `term.en`（用語名）
- `summary.ja` / `summary.en`（概要）

### 検索ロジック
- 部分一致・大文字小文字不問
- 空クエリ = 全件表示
- 表示モード（カテゴリ別/アルファベット順）と AND 条件で連動

---

## 10. 今後の拡張予定

- **「コンテナ一般の概念」グループの解説を汎用化**（Docker固有の記述 → コンテナ技術一般の解説に改訂、Podman等の他ツール例示含む。Dockerの場合の情報は両立せた記述とする）
- Level 3（Docker Compose）以降の用語追加
- 双方向リンク実装（メインカリキュラム ↔ 辞書）
- 用語の学習ステータス（「理解した」マーク）
- 関連用語グラフの可視化
- 検索候補のサジェスト表示
