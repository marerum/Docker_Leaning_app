# 💻 演習コンテンツ — 仕様書

> 最終更新: 2026-03-08

## 1. ポジショニング

| 項目 | メインカリキュラム | 演習コンテンツ |
|------|-------------------|-------------|
| 目的 | 概念理解 + シミュレーション体験 | ローカル環境での実機操作 |
| 場所 | `/guide/[id]` | `/practice/[id]` |
| 対象 | 全学習者 | 自分のPCで実践したい学習者 |
| 前提 | なし | Docker Desktop / ターミナル環境 |

## 2. 演習の共通構成

各演習は以下のセクションで構成される：

```
1. ゴール        — この演習で何ができるようになるか
2. 前提          — 必要な事前知識・環境
3. ステップ      — 手順（Win/Mac 分岐あり）
4. 到達確認      — セルフチェックリスト
5. つまずきポイント — よくあるエラーと対処法
6. 補足・豆知識   — 知っておくと便利な情報
```

## 3. データ構造

演習データは `src/lib/content/practices.ts` で管理。

```typescript
interface PracticeExercise {
  id: string;           // "0-1", "1-3" etc.
  level: number;        // 0, 1, 2, ...
  levelLabel: string;   // "Lv.0"
  icon: string;         // 絵文字
  title: { ja: string; en: string };
  goal: { ja: string; en: string };
  prereqs: string[];    // 前提演習ID
  steps: PracticeStep[];
  checklist: { ja: string; en: string }[];
  troubleshooting?: TroubleshootItem[];
  tips?: { ja: string; en: string };
}
```

## 4. ページ構成

### 一覧ページ (`/practice`)
- Lv別のカードグリッドで演習を表示
- 各カードにアイコン・タイトル・ゴール・ステップ数・チェック数
- Lv.2 以降は「工事中」セクションとして目次のみ表示

### 詳細ページ (`/practice/[id]`)
- ヘッダー: アイコン + レベル + タイトル + 一覧リンク
- ゴールセクション
- ステップカード（番号付き）
  - テキスト説明
  - OS別手順（Win/Mac トグル、ユーザーの設定に連動）
  - コマンドブロック（コピーボタン付き）
- 到達確認チェックリスト（クリックでチェック可能）
- つまずきポイント（症状＋対処法）
- 豆知識
- 前後ナビゲーション

### サイドバー
- メインカリキュラムと同じアコーディオン形式
- Lv.0-1: 個別演習へのリンク付き
- Lv.2-7: レベル名＋「（工事中）」のみ表示

## 5. OS 切替

- ヘッダーの Win/Mac トグルに連動
- ステップ内の `osSpecific` フィールドがある場合のみ OS 別表示を切替

## 6. メディア挿入（未実装）

> ⚠️ 以下は設計方針。撮影・配置は後日対応。

```markdown
<!-- MEDIA: lv0/0-3_docker-desktop-dashboard.png -->
```

```
public/practice/media/
├── lv0/
│   ├── 0-1_vscode-extensions.png
│   └── 0-3_docker-desktop-dashboard.png
├── lv1/
│   ├── 1-1_nginx-welcome-browser.png
│   └── 1-4_exec-ubuntu-shell.gif
└── ...
```

**命名規則:** `<演習番号>_<内容>_<OS(任意)>.<拡張子>`  
**実装時:** 画像未配置は「📷 準備中」フォールバック表示。

## 7. i18n 対応

- 全テキストフィールドが `{ ja: string; en: string }` 形式
- ヘッダーの JP/EN トグルに連動
