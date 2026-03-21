# Docker Quest — モバイルレスポンシブ対応 仕様書

**バージョン**: v1.0
**作成日**: 2026-03-20
**対象フェーズ**: MVP（Phase 1 完了後）
**ステータス**: 実装待ち

---

## 1. 背景・目的

### 1.1 背景

Docker Quest は現在デスクトップ専用設計で構築されており、スマートフォンでアクセスすると以下の問題が発生している。

- `Sidebar`（width: 260px、position: fixed）が画面全体を占領する
- `Header` が `left: var(--sidebar-width)` で右にオフセットされ、コンテンツエリアが極小化する
- `mainArea` が `margin-left: var(--sidebar-width)` で右にズレたまま表示される
- コードブロックが横スクロールを引き起こす

### 1.2 目的

スマートフォンブラウザ（主にiOS Safari / Android Chrome）でコンテンツが正常に閲覧・操作できる状態にし、フィードバック収集できるユーザー母数を最大化する。

### 1.3 方針

> **デスクトップの表示・動作を一切変えない** ことを最優先とする。
> モバイル対応はすべて `@media (max-width: 768px)` スコープ内で完結させる。

---

## 2. スコープ

### 2.1 今回のスコープ（MVP対応）

| 対象 | 内容 |
|------|------|
| ✅ Sidebar | ドロワー化（デフォルト非表示、ハンバーガーで開閉） |
| ✅ Header | モバイル用レイアウト調整、ハンバーガーボタン追加 |
| ✅ AppShell | メインエリアのmargin/padding調整 |
| ✅ オーバーレイ | Sidebar背後の暗転、タップで閉じる |
| ✅ コンテンツエリア | 横スクロール防止、タッチターゲットサイズ確保 |

### 2.2 スコープ外（将来フェーズ）

| 対象 | 将来フェーズ |
|------|------------|
| Tailwind CSS への移行 | Phase 2 |
| PWA化（ホーム画面追加・オフライン対応） | Phase 2〜3 |
| ボトムナビゲーション | Phase 3 |
| スワイプジェスチャーでSidebar開閉 | Phase 3 |
| Flutter ネイティブアプリ版 | Phase 3（Webは別途維持） |

---

## 3. 技術スタック決定

チーム討議（2026-03-20）の結果、以下を採択。

| 項目 | 採択 | 却下した選択肢と理由 |
|------|------|-------------------|
| スタイル | **CSS Modules + `@media` クエリ** | Tailwind：既存14ファイルの全書き直しが必要（Phase 2以降に延期） |
| 状態管理 | **React `useState`（AppShellに集約）** | Zustand追加：オーバーエンジニアリング |
| アニメーション | **CSS `transform: translateX`** | Framer Motion：バンドルサイズ増大 |
| Web以外の対応 | **対象外（今回）** | Flutter Web：SEOが死亡するためコンテンツ型サービスに不適 |
| 新規ライブラリ | **追加なし** | バンドルサイズ・依存管理コストを増やさない |

### 3.1 Flutter に関する判断記録

Flutter Web は以下の理由で現フェーズでは採択しない。

```
❌ Flutter Web に全移行
   理由：
   - Canvas レンダリングのため SEO が機能しない
   - Docker Quest はコンテンツ型サービスであり Google 検索流入が主要チャネル
   - 現資産（chapters.ts 2064行、store設計、CSS設計）がすべて廃棄になる
   - 移行コストが超大、MVP後の負債になる

✅ Flutter の正しい採用タイミング（将来）
   - Phase 3 でネイティブアプリ版（iOS/Android）を作る際に選択肢として検討
   - Web は Next.js のまま維持し、コンテンツは API 経由で共有する 2本立て構成
```

---

## 4. ブレークポイント定義

```css
/* モバイル境界 */
@media (max-width: 768px) { ... }

/* 参考：デバイス幅 */
/* iPhone SE        : 375px */
/* iPhone 14        : 390px */
/* iPhone 14 Plus   : 430px */
/* Android 一般     : 360〜412px */
/* iPad mini        : 768px  ← この幅まではモバイル扱い */
/* iPad Air / Pro   : 820px〜 ← デスクトップ扱い */
```

**採用根拠**: 768px 以下はキーボードなしタッチ操作が主体。iPad mini（768px）はギリギリモバイル扱いとし、Sidebar ドロワーを提供する。

---

## 5. 機能要件

### 5.1 Must（これがないと使えない）

| ID | 要件 | 対象コンポーネント |
|----|------|-----------------|
| F-01 | モバイル時、Sidebar はデフォルトで非表示（画面外に格納）されること | Sidebar |
| F-02 | Header にハンバーガーボタンが表示され、タップで Sidebar が開くこと | Header |
| F-03 | Sidebar 開閉状態が AppShell の state で一元管理されること | AppShell |
| F-04 | Sidebar 外のオーバーレイをタップすると Sidebar が閉じること | AppShell |
| F-05 | Sidebar 内のリンクをタップすると Sidebar が自動的に閉じること | Sidebar |
| F-06 | ページ遷移後に Sidebar が閉じること（`usePathname` の変化で検知） | Sidebar |
| F-07 | コンテンツ本文が横スクロールなしに読めること | AppShell, globals.css |
| F-08 | すべてのタップ可能要素のタッチターゲットが最低 44×44px あること | 各コンポーネント |

### 5.2 Should（体験向上）

| ID | 要件 |
|----|------|
| F-09 | Sidebar の開閉アニメーションがスムーズ（0.25s スライド）であること |
| F-10 | ハンバーガーアイコンが開閉状態に応じて「☰ / ✕」で切り替わること |
| F-11 | Header の OS トグル・言語トグルがモバイルでも操作可能であること |

### 5.3 Won't（今回対象外）

- スワイプジェスチャーによる Sidebar 開閉
- ボトムナビゲーション
- PWA（ホーム画面追加）

---

## 6. 非機能要件

| 区分 | 要件 | 基準 |
|------|------|------|
| パフォーマンス | 新規 npm パッケージを追加しない | バンドルサイズ増加ゼロ |
| 後方互換性 | デスクトップ（769px以上）の表示・動作を変えない | 既存テスト（目視）がすべてパスすること |
| アクセシビリティ | ハンバーガーボタンに `aria-label` と `aria-expanded` を付与 | WCAG 2.1 AA 準拠 |
| アクセシビリティ | Sidebar が閉じている間、スクリーンリーダーから隠す（`aria-hidden`） | WCAG 2.1 AA 準拠 |
| アニメーション | Sidebar 開閉は `transform: translateX` のみ（`width` アニメーション禁止） | レイアウトシフトを防ぐ |
| タッチ操作 | `hover` 疑似クラスのみに依存したインタラクションを作らない | タッチデバイスで hover は発火しない |

---

## 7. コンポーネント別 変更仕様

### 7.1 AppShell.tsx

**変更内容**: `isSidebarOpen` state の追加と子コンポーネントへの props 受け渡し

```tsx
// 追加する state
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// Sidebar に渡す props
<Sidebar
    streak={streak}
    isOpen={isSidebarOpen}               // 追加
    onClose={() => setIsSidebarOpen(false)} // 追加
/>

// Header に渡す props
<Header
    level={level}
    isSidebarOpen={isSidebarOpen}                    // 追加
    onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} // 追加
/>

// オーバーレイ（Sidebar背後）を追加
{isSidebarOpen && (
    <div
        className={styles.overlay}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
    />
)}
```

### 7.2 AppShell.module.css

**変更内容**: モバイル用 `@media` クエリの追加

```css
/* 追加：オーバーレイ */
.overlay {
    display: none; /* デスクトップでは非表示 */
}

@media (max-width: 768px) {
    .mainArea {
        margin-left: 0;                  /* Sidebar オフセット解除 */
        padding-top: var(--header-height);
        padding-bottom: var(--footer-height);
    }

    .content {
        padding: var(--space-4) var(--space-4); /* デスクトップ: space-8 → モバイル: space-4 */
    }

    .overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 150; /* Sidebar(200) より低く、mainArea より高く */
    }
}
```

### 7.3 Sidebar.tsx

**変更内容**: props 追加、リンク選択後に自動クローズ

```tsx
interface SidebarProps {
    streak: number;
    isOpen: boolean;      // 追加
    onClose: () => void;  // 追加
}

// usePathname の変化で Sidebar を閉じる
useEffect(() => {
    onClose();
}, [pathname]);

// aside に className を動的に付与
<aside
    className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
    aria-hidden={!isOpen}  // スクリーンリーダー対応（モバイル時）
>
```

### 7.4 Sidebar.module.css

**変更内容**: モバイルでドロワー化

```css
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);       /* デフォルト：画面外 */
        transition: transform 0.25s ease;
        z-index: 200;
    }

    .sidebarOpen {
        transform: translateX(0);           /* 開いた状態 */
    }
}
```

### 7.5 Header.tsx

**変更内容**: ハンバーガーボタンの追加

```tsx
interface HeaderProps {
    level: number;
    isSidebarOpen: boolean;       // 追加
    onToggleSidebar: () => void;  // 追加
}

// JSX に追加（controls の左側）
<button
    className={styles.hamburger}
    onClick={onToggleSidebar}
    aria-label={isSidebarOpen ? 'メニューを閉じる' : 'メニューを開く'}
    aria-expanded={isSidebarOpen}
>
    {isSidebarOpen ? '✕' : '☰'}
</button>
```

### 7.6 Header.module.css

**変更内容**: モバイル用レイアウト調整、ハンバーガーボタンのスタイル追加

```css
/* ハンバーガーボタン：デスクトップでは非表示 */
.hamburger {
    display: none;
}

@media (max-width: 768px) {
    .header {
        left: 0; /* sidebar offset 解除 */
    }

    .hamburger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: none;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        color: var(--color-text-primary);
        font-size: var(--text-lg);
        cursor: pointer;
    }

    /* ロゴテキストを省略（スペース節約） */
    .logoText {
        display: none;
    }
}
```

---

## 8. 状態管理設計

```
AppShell
│
├─ state: isSidebarOpen (boolean, default: false)
│
├─ <Sidebar isOpen={isSidebarOpen} onClose={...} />
│       └─ useEffect([pathname]) → onClose() でページ遷移時に閉じる
│
├─ <Header onToggleSidebar={...} isSidebarOpen={isSidebarOpen} />
│       └─ hamburger button → onToggleSidebar()
│
└─ overlay div（isSidebarOpen が true の時のみレンダリング）
        └─ onClick → setIsSidebarOpen(false)
```

**LocalStorage への保存**: しない（UI 状態であってユーザーデータではない）

---

## 9. アクセシビリティ要件

| 要素 | 実装内容 |
|------|---------|
| ハンバーガーボタン | `aria-label="メニューを開く/閉じる"` + `aria-expanded={isSidebarOpen}` |
| Sidebar（モバイル閉時） | `aria-hidden="true"` でスクリーンリーダーから隠す |
| オーバーレイ | `aria-hidden="true"` |
| すべてのタップ要素 | 最低 44×44px のタッチターゲット確保 |

---

## 10. 変更ファイル一覧

| ファイル | 変更種別 | 主な変更内容 |
|---------|---------|------------|
| `src/components/layout/AppShell.tsx` | 修正 | `isSidebarOpen` state追加、overlay追加 |
| `src/components/layout/AppShell.module.css` | 修正 | `@media`クエリ追加、overlay スタイル |
| `src/components/layout/Sidebar.tsx` | 修正 | `isOpen`/`onClose` props追加、pathname監視 |
| `src/components/layout/Sidebar.module.css` | 修正 | `@media`クエリ追加、ドロワーアニメーション |
| `src/components/layout/Header.tsx` | 修正 | ハンバーガーボタン追加 |
| `src/components/layout/Header.module.css` | 修正 | `@media`クエリ追加、hamburger スタイル |

**新規ファイル**: なし
**削除ファイル**: なし
**新規 npm パッケージ**: なし

---

## 11. 実装ステップ

```
Step 1: AppShell.tsx に isSidebarOpen state 追加・overlay 追加   （15分）
Step 2: AppShell.module.css に @media クエリ・overlay スタイル追加（20分）
Step 3: Header.tsx にハンバーガーボタン追加                       （20分）
Step 4: Header.module.css にモバイル対応スタイル追加              （20分）
Step 5: Sidebar.tsx に isOpen/onClose props 追加・pathname監視   （30分）
Step 6: Sidebar.module.css にドロワーアニメーション追加           （20分）
Step 7: 動作確認・微調整（iOS Safari / Android Chrome）          （1時間）
─────────────────────────────────────────────────────────────
合計: 約 3〜4時間
```

---

## 12. テスト観点

### 12.1 機能テスト（手動）

| # | テスト内容 | 合格条件 |
|---|-----------|---------|
| T-01 | 768px 以下でハンバーガーボタンが表示される | ✅ 表示される |
| T-02 | ハンバーガーボタンをタップで Sidebar が開く | ✅ スライドインする |
| T-03 | オーバーレイをタップで Sidebar が閉じる | ✅ スライドアウトする |
| T-04 | Sidebar 内のリンクをタップで遷移かつ閉じる | ✅ 遷移・クローズ |
| T-05 | 769px 以上で Sidebar が常時表示される | ✅ 従来通り |
| T-06 | 769px 以上でハンバーガーボタンが非表示 | ✅ 非表示 |
| T-07 | コンテンツが横スクロールなしに読める | ✅ 横スクロールなし |
| T-08 | デスクトップの全ページで表示崩れがない | ✅ 変化なし |

### 12.2 確認デバイス・ブラウザ

| デバイス | ブラウザ | 優先度 |
|---------|---------|--------|
| iPhone（390px） | iOS Safari | 必須 |
| Android（412px） | Chrome | 必須 |
| iPad mini（768px） | Safari | 推奨 |
| Chrome DevTools モバイルエミュレータ | Chrome | 開発中に随時 |

---

## 13. 将来ロードマップとの関係

```
今回（MVP）
└─ CSS Modules + @media で最小コスト実装
        ↓
Phase 2（〜6ヶ月後）
├─ Tailwind CSS 移行（CSS管理の一元化）
│     └─ 今回の @media クエリをそのまま Tailwind に変換可能
└─ PWA 化（next-pwa 追加）
        ↓
Phase 3（ネイティブアプリ検討時）
└─ Flutter でネイティブアプリ版（iOS/Android）
      ├─ Web（Next.js）は別途維持
      └─ コンテンツは API 経由で共有
```

---

## 14. 関連ドキュメント

- [`docs/specification.md`](../specification.md) — 全体仕様書
- [`docs/roadmap.md`](../roadmap.md) — 開発ロードマップ
- [`../team_review_2026-03-15.md`](../../team_review_2026-03-15.md) — チームレビュー議事録（優先順位決定の経緯）
