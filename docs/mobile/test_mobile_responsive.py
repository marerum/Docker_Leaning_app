"""
Docker Quest - モバイルレスポンシブ対応 テストスクリプト
仕様書: docs/mobile/mobile-responsive-spec.md

テスト項目:
  T-01: 768px以下でハンバーガーボタンが表示される
  T-02: ハンバーガーボタンタップでSidebarが開く
  T-03: オーバーレイタップでSidebarが閉じる
  T-04: Sidebar内リンクタップで遷移かつ自動クローズ
  T-05: 769px以上でSidebarが常時表示される
  T-06: 769px以上でハンバーガーボタンが非表示
  T-07: コンテンツが横スクロールなしに読める
  T-08: デスクトップ全ページで表示崩れがない
"""

import sys
import os
# Windows cp932対応
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright, expect

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "docs/mobile/test_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

PASS = "✅ PASS"
FAIL = "❌ FAIL"
results = []

def log(test_id, name, status, detail=""):
    mark = PASS if status else FAIL
    msg = f"  {mark} {test_id}: {name}"
    if detail:
        msg += f"\n       → {detail}"
    print(msg)
    results.append((test_id, name, status, detail))

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ──────────────────────────────────────────────
        # モバイルコンテキスト (375px × 812px / iPhone想定)
        # ──────────────────────────────────────────────
        print("\n📱 モバイルビュー (375px) テスト")
        print("─" * 50)

        mobile_ctx = browser.new_context(viewport={"width": 375, "height": 812})
        page = mobile_ctx.new_page()
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/T01_mobile_initial.png")

        # T-01: ハンバーガーボタンが表示される
        hamburger = page.locator("button[aria-label]").first
        try:
            hamburger = page.get_by_role("button", name="メニューを開く")
            is_visible = hamburger.is_visible()
            log("T-01", "ハンバーガーボタンが375pxで表示される", is_visible)
        except Exception as e:
            log("T-01", "ハンバーガーボタンが375pxで表示される", False, str(e))

        # T-01b: Sidebarがデフォルトで画面外にある（translateX(-100%)）
        try:
            sidebar = page.locator("aside")
            box = sidebar.bounding_box()
            # translateXで画面外に出ている場合、x座標が負またはSidebarが画面幅外
            sidebar_offscreen = box is None or box["x"] < 0 or box["x"] + box["width"] <= 0
            log("T-01b", "Sidebarがデフォルトで非表示（画面外）", sidebar_offscreen,
                f"sidebar.x={box['x'] if box else 'None'}")
        except Exception as e:
            log("T-01b", "Sidebarがデフォルトで非表示（画面外）", False, str(e))

        # T-02: ハンバーガータップでSidebarが開く
        try:
            hamburger = page.get_by_role("button", name="メニューを開く")
            hamburger.click()
            page.wait_for_timeout(400)  # アニメーション待機
            page.screenshot(path=f"{SCREENSHOT_DIR}/T02_sidebar_open.png")

            sidebar = page.locator("aside")
            box = sidebar.bounding_box()
            # 開いた後はx=0付近にあるはず
            is_open = box is not None and box["x"] >= -5
            log("T-02", "ハンバーガータップでSidebarが開く", is_open,
                f"sidebar.x={box['x'] if box else 'None'}")

            # aria-expanded が true になっているか確認
            close_btn = page.get_by_role("button", name="メニューを閉じる")
            aria_ok = close_btn.is_visible()
            log("T-02b", "開いた後aria-labelが「メニューを閉じる」に変わる", aria_ok)
        except Exception as e:
            log("T-02", "ハンバーガータップでSidebarが開く", False, str(e))
            log("T-02b", "aria-label変化確認", False, str(e))

        # T-03: オーバーレイタップでSidebarが閉じる
        try:
            # オーバーレイをクリック（Sidebar外の右側エリア）
            page.mouse.click(350, 400)
            page.wait_for_timeout(400)
            page.screenshot(path=f"{SCREENSHOT_DIR}/T03_overlay_close.png")

            sidebar = page.locator("aside")
            box = sidebar.bounding_box()
            is_closed = box is None or box["x"] < 0
            log("T-03", "オーバーレイタップでSidebarが閉じる", is_closed,
                f"sidebar.x={box['x'] if box else 'None'}")
        except Exception as e:
            log("T-03", "オーバーレイタップでSidebarが閉じる", False, str(e))

        # T-04: Sidebar内リンクタップでページ遷移 & 自動クローズ
        try:
            # Sidebarを再度開く
            hamburger = page.get_by_role("button", name="メニューを開く")
            hamburger.click()
            page.wait_for_timeout(400)

            # 辞書リンクをタップ
            dict_link = page.get_by_role("link", name="辞書").first
            if not dict_link.is_visible():
                # fallback: テキストで探す
                dict_link = page.locator("a[href='/dictionary']").first
            dict_link.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(400)
            page.screenshot(path=f"{SCREENSHOT_DIR}/T04_after_nav.png")

            # ページ遷移確認
            current_url = page.url
            navigated = "/dictionary" in current_url

            # Sidebarが閉じているか確認
            sidebar = page.locator("aside")
            box = sidebar.bounding_box()
            sidebar_closed = box is None or box["x"] < 0

            log("T-04", "Sidebar内リンクタップでページ遷移", navigated, f"URL={current_url}")
            log("T-04b", "ページ遷移後にSidebarが自動クローズ", sidebar_closed,
                f"sidebar.x={box['x'] if box else 'None'}")
        except Exception as e:
            log("T-04", "Sidebar内リンクタップでページ遷移", False, str(e))
            log("T-04b", "ページ遷移後にSidebarが自動クローズ", False, str(e))

        # T-07: 横スクロールが発生していない
        try:
            page.goto(BASE_URL)
            page.wait_for_load_state("networkidle")
            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            client_width = page.evaluate("document.documentElement.clientWidth")
            no_hscroll = scroll_width <= client_width + 2  # 2px の誤差許容
            log("T-07", "コンテンツが横スクロールなしに表示される", no_hscroll,
                f"scrollWidth={scroll_width}, clientWidth={client_width}")
        except Exception as e:
            log("T-07", "横スクロールなし確認", False, str(e))

        # T-07b: ガイドページでも横スクロールなし
        try:
            page.goto(f"{BASE_URL}/guide/1")
            page.wait_for_load_state("networkidle")
            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            client_width = page.evaluate("document.documentElement.clientWidth")
            no_hscroll = scroll_width <= client_width + 2
            page.screenshot(path=f"{SCREENSHOT_DIR}/T07_guide_mobile.png", full_page=True)
            log("T-07b", "ガイドページで横スクロールなし", no_hscroll,
                f"scrollWidth={scroll_width}, clientWidth={client_width}")
        except Exception as e:
            log("T-07b", "ガイドページ横スクロールなし", False, str(e))

        mobile_ctx.close()

        # ──────────────────────────────────────────────
        # デスクトップコンテキスト (1280px)
        # ──────────────────────────────────────────────
        print("\n🖥️  デスクトップビュー (1280px) テスト")
        print("─" * 50)

        desktop_ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page_d = desktop_ctx.new_page()

        pages_to_check = [
            ("/", "ホーム"),
            ("/guide/1", "ガイド Ch.1"),
            ("/dictionary", "辞書"),
            ("/practice", "練習問題"),
            ("/progress", "進捗"),
        ]

        for path, name in pages_to_check:
            try:
                page_d.goto(f"{BASE_URL}{path}")
                page_d.wait_for_load_state("networkidle")

                # T-05: Sidebarが常時表示
                sidebar = page_d.locator("aside")
                box = sidebar.bounding_box()
                sidebar_visible = box is not None and box["x"] >= 0 and box["width"] > 0
                log("T-05", f"デスクトップでSidebar常時表示 [{name}]", sidebar_visible,
                    f"x={box['x'] if box else 'None'}, w={box['width'] if box else 'None'}")

                # T-06: ハンバーガーボタンが非表示
                try:
                    hamburger = page_d.get_by_role("button", name="メニューを開く")
                    burger_hidden = not hamburger.is_visible()
                except Exception:
                    burger_hidden = True  # 要素が存在しない場合も非表示と判定
                log("T-06", f"デスクトップでハンバーガー非表示 [{name}]", burger_hidden)

                # T-08: 表示崩れなし（mainAreaのmargin-leftが正しい）
                main_area = page_d.locator("main")
                main_box = main_area.bounding_box()
                # mainがsidebar(260px)の右から始まっているか
                main_ok = main_box is not None and main_box["x"] >= 255
                log("T-08", f"デスクトップでmainAreaがズレていない [{name}]", main_ok,
                    f"main.x={main_box['x'] if main_box else 'None'}")

                screenshot_name = path.replace("/", "_").strip("_") or "home"
                page_d.screenshot(path=f"{SCREENSHOT_DIR}/T08_desktop_{screenshot_name}.png")

            except Exception as e:
                log("T-05/06/08", f"デスクトップチェック [{name}]", False, str(e))

        desktop_ctx.close()

        # ──────────────────────────────────────────────
        # 境界値テスト (768px / 769px)
        # ──────────────────────────────────────────────
        print("\n📐 ブレークポイント境界値テスト")
        print("─" * 50)

        for width, label in [(768, "768px（モバイル境界）"), (769, "769px（デスクトップ境界）")]:
            try:
                ctx = browser.new_context(viewport={"width": width, "height": 900})
                pg = ctx.new_page()
                pg.goto(BASE_URL)
                pg.wait_for_load_state("networkidle")

                burger = pg.get_by_role("button", name="メニューを開く")
                burger_visible = burger.is_visible()

                sidebar = pg.locator("aside")
                box = sidebar.bounding_box()

                if width <= 768:
                    # モバイル: ハンバーガー表示、Sidebar非表示
                    ok = burger_visible and (box is None or box["x"] < 0)
                    log(f"BP-{width}", f"{label}: ハンバーガー表示＆Sidebar非表示", ok,
                        f"burger={burger_visible}, sidebar.x={box['x'] if box else 'None'}")
                else:
                    # デスクトップ: ハンバーガー非表示、Sidebar表示
                    ok = not burger_visible and (box is not None and box["x"] >= 0)
                    log(f"BP-{width}", f"{label}: ハンバーガー非表示＆Sidebar表示", ok,
                        f"burger={burger_visible}, sidebar.x={box['x'] if box else 'None'}")

                pg.screenshot(path=f"{SCREENSHOT_DIR}/BP_{width}.png")
                ctx.close()
            except Exception as e:
                log(f"BP-{width}", f"境界値テスト {label}", False, str(e))

        browser.close()

    # ──────────────────────────────────────────────
    # 結果サマリー
    # ──────────────────────────────────────────────
    print("\n" + "═" * 50)
    print("📊 テスト結果サマリー")
    print("═" * 50)
    passed = sum(1 for _, _, s, _ in results if s)
    failed = sum(1 for _, _, s, _ in results if not s)
    total = len(results)
    print(f"  合計: {total}件  |  ✅ {passed}件  |  ❌ {failed}件")
    print(f"  スクリーンショット保存先: {SCREENSHOT_DIR}/")

    if failed > 0:
        print("\n  ❌ 失敗したテスト:")
        for test_id, name, status, detail in results:
            if not status:
                print(f"    - {test_id}: {name}")
                if detail:
                    print(f"      {detail}")

    print("═" * 50)
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
