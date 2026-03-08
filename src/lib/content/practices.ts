// Practice exercise content definitions
// Structure: level > exercises with steps, checklists, troubleshooting

export interface PracticeStep {
    title: { ja: string; en: string };
    content: { ja: string; en: string };
    commands?: string[];
    osSpecific?: {
        windows: { ja: string; en: string };
        mac: { ja: string; en: string };
    };
    media?: string;
}

export interface TroubleshootItem {
    symptom: { ja: string; en: string };
    fix: { ja: string; en: string };
}

export interface PracticeExercise {
    id: string;
    level: number;
    levelLabel: string;
    icon: string;
    title: { ja: string; en: string };
    goal: { ja: string; en: string };
    prereqs: string[];
    steps: PracticeStep[];
    checklist: { ja: string; en: string }[];
    troubleshooting?: TroubleshootItem[];
    tips?: { ja: string; en: string };
    wip?: boolean;
}

// ── Level labels for sidebar ──
export const PRACTICE_LEVEL_LABELS: Record<string, { ja: string; en: string }[]> = {
    implemented: [
        { ja: 'Lv.0 環境構築', en: 'Lv.0 Environment Setup' },
        { ja: 'Lv.1 Docker 基礎操作', en: 'Lv.1 Docker Basics' },
    ],
    wip: [
        { ja: 'Lv.2 イメージ構築', en: 'Lv.2 Image Building' },
        { ja: 'Lv.3 Docker Compose', en: 'Lv.3 Docker Compose' },
        { ja: 'Lv.3.5 クラウド開発環境', en: 'Lv.3.5 Cloud Dev Environment' },
        { ja: 'Lv.4 実践プロジェクト', en: 'Lv.4 Real Projects' },
        { ja: 'Lv.5 運用・デバッグ', en: 'Lv.5 Operations & Debug' },
        { ja: 'Lv.6 CI/CD', en: 'Lv.6 CI/CD' },
        { ja: 'Lv.7 クラウドデプロイ', en: 'Lv.7 Cloud Deploy' },
    ],
};

// ── WIP exercise stubs for Lv.2+ (sidebar only) ──
export const WIP_EXERCISES: { level: number; levelLabel: string; exercises: { id: string; icon: string; title: { ja: string; en: string } }[] }[] = [
    {
        level: 2, levelLabel: 'Lv.2',
        exercises: [
            { id: '2-1', icon: '📝', title: { ja: 'はじめてのDockerfile', en: 'Your First Dockerfile' } },
            { id: '2-2', icon: '🟢', title: { ja: 'Node.js アプリをコンテナ化', en: 'Containerize a Node.js App' } },
            { id: '2-3', icon: '⚡', title: { ja: 'レイヤーとキャッシュの最適化', en: 'Layer & Cache Optimization' } },
            { id: '2-4', icon: '🏗️', title: { ja: 'マルチステージビルド', en: 'Multi-Stage Build' } },
        ],
    },
    {
        level: 3, levelLabel: 'Lv.3',
        exercises: [
            { id: '3-1', icon: '🎼', title: { ja: 'はじめての Compose', en: 'Your First Compose' } },
            { id: '3-2', icon: '🔗', title: { ja: 'Web + DB 構成を作ろう', en: 'Web + DB Setup' } },
            { id: '3-3', icon: '⚙️', title: { ja: '環境変数で設定を管理', en: 'Manage Config with Env Vars' } },
            { id: '3-4', icon: '🔄', title: { ja: '開発環境をホットリロード', en: 'Hot Reload Dev Environment' } },
            { id: '3-5', icon: '🏆', title: { ja: '3サービス構成（総合演習）', en: '3-Service Architecture' } },
        ],
    },
    {
        level: 3.5, levelLabel: 'Lv.3.5',
        exercises: [
            { id: '3.5-1', icon: '📦', title: { ja: 'Dev Containers 入門', en: 'Intro to Dev Containers' } },
            { id: '3.5-2', icon: '☁️', title: { ja: 'GitHub Codespaces で開発', en: 'Dev with GitHub Codespaces' } },
            { id: '3.5-3', icon: '🖥️', title: { ja: 'リモート VM + Docker', en: 'Remote VM + Docker' } },
        ],
    },
    {
        level: 4, levelLabel: 'Lv.4',
        exercises: [
            { id: '4-1', icon: '📰', title: { ja: 'ブログサービスを作ろう', en: 'Build a Blog Service' } },
            { id: '4-2', icon: '🔌', title: { ja: 'API サーバーを作ろう', en: 'Build an API Server' } },
            { id: '4-3', icon: '🌐', title: { ja: 'フルスタック SPA 構成', en: 'Full-Stack SPA' } },
        ],
    },
    {
        level: 5, levelLabel: 'Lv.5',
        exercises: [
            { id: '5-1', icon: '🔍', title: { ja: 'トラブルシューティング入門', en: 'Intro to Troubleshooting' } },
            { id: '5-2', icon: '🌐', title: { ja: 'Docker ネットワーク実践', en: 'Docker Network Practice' } },
            { id: '5-3', icon: '📤', title: { ja: 'イメージのプッシュと管理', en: 'Push & Manage Images' } },
            { id: '5-4', icon: '🔒', title: { ja: 'セキュリティ基本対策', en: 'Security Basics' } },
        ],
    },
    {
        level: 6, levelLabel: 'Lv.6',
        exercises: [
            { id: '6-1', icon: '⚙️', title: { ja: 'GitHub Actions でビルド自動化', en: 'Auto Build with GitHub Actions' } },
            { id: '6-2', icon: '🧪', title: { ja: 'テスト → ビルド → プッシュ', en: 'Test → Build → Push' } },
            { id: '6-3', icon: '🚀', title: { ja: '環境別デプロイ', en: 'Environment-Based Deploy' } },
        ],
    },
    {
        level: 7, levelLabel: 'Lv.7',
        exercises: [
            { id: '7-1', icon: '☁️', title: { ja: 'クラウドデプロイ入門', en: 'Intro to Cloud Deploy' } },
            { id: '7-2', icon: '🔷', title: { ja: 'Azure でデプロイ', en: 'Deploy on Azure' } },
            { id: '7-3', icon: '🟠', title: { ja: 'AWS でデプロイ', en: 'Deploy on AWS' } },
            { id: '7-4', icon: '🔵', title: { ja: 'GCP でデプロイ', en: 'Deploy on GCP' } },
        ],
    },
];

// ═══════════════════════════════════════
// EXERCISE DATA
// ═══════════════════════════════════════

export const practiceExercises: PracticeExercise[] = [

    // ─────────────────────────────────────
    // Lv.0 環境構築
    // ─────────────────────────────────────

    {
        id: '0-1',
        level: 0,
        levelLabel: 'Lv.0',
        icon: '🛠️',
        title: { ja: '開発ツールの準備', en: 'Setting Up Dev Tools' },
        goal: { ja: 'VS Code をインストールし、Docker 学習に必要な拡張機能を導入する', en: 'Install VS Code and add essential extensions for Docker learning' },
        prereqs: [],
        steps: [
            {
                title: { ja: 'VS Code のインストール', en: 'Install VS Code' },
                content: {
                    ja: '公式サイトからダウンロードしてインストールします。',
                    en: 'Download and install from the official site.',
                },
                osSpecific: {
                    windows: {
                        ja: 'https://code.visualstudio.com/ → Windows 用 `.exe` をダウンロード → インストーラに従い完了',
                        en: 'https://code.visualstudio.com/ → Download `.exe` for Windows → Follow the installer',
                    },
                    mac: {
                        ja: 'https://code.visualstudio.com/ → macOS 用 `.zip` をダウンロード → `Applications` フォルダへ移動',
                        en: 'https://code.visualstudio.com/ → Download `.zip` for macOS → Move to `Applications` folder',
                    },
                },
            },
            {
                title: { ja: '日本語化（任意）', en: 'Japanese Language Pack (Optional)' },
                content: {
                    ja: '`Ctrl+Shift+X`（Mac: `Cmd+Shift+X`）で拡張機能を開き、「Japanese Language Pack」を検索 → インストール → 再起動',
                    en: 'Open Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`), search "Japanese Language Pack" → Install → Restart',
                },
            },
            {
                title: { ja: 'Docker 関連の拡張機能を導入', en: 'Install Docker Extensions' },
                content: {
                    ja: '以下の拡張機能をインストールします：\n\n- **Docker** (Microsoft) — Dockerfile / Compose のシンタックスハイライト、コンテナ管理\n- **Dev Containers** (Microsoft) — コンテナ内での開発（Lv.3.5 で使用）',
                    en: 'Install the following extensions:\n\n- **Docker** (Microsoft) — Dockerfile/Compose syntax highlight, container management\n- **Dev Containers** (Microsoft) — Development inside containers (used in Lv.3.5)',
                },
            },
            {
                title: { ja: '基本操作の確認', en: 'Verify Basic Operations' },
                content: {
                    ja: '新規ファイル作成 → 保存 → 編集ができることを確認。ターミナルパネルを開く（`` Ctrl+` ``）',
                    en: 'Verify you can create, save, and edit files. Open the terminal panel (`` Ctrl+` ``)',
                },
            },
        ],
        checklist: [
            { ja: 'VS Code が起動する', en: 'VS Code starts successfully' },
            { ja: 'ターミナルパネルが表示される', en: 'Terminal panel is visible' },
            { ja: 'Docker 拡張機能がインストール済み', en: 'Docker extension is installed' },
        ],
        troubleshooting: [
            {
                symptom: { ja: 'Win: インストーラが起動しない', en: 'Win: Installer won\'t start' },
                fix: { ja: '管理者として実行 / ウイルス対策ソフトの除外設定', en: 'Run as administrator / Add to antivirus exclusions' },
            },
            {
                symptom: { ja: 'Mac: 「開発元を確認できない」警告', en: 'Mac: "Developer cannot be verified" warning' },
                fix: { ja: 'システム設定 → プライバシーとセキュリティ → 「このまま開く」', en: 'System Settings → Privacy & Security → "Open Anyway"' },
            },
        ],
    },

    {
        id: '0-2',
        level: 0,
        levelLabel: 'Lv.0',
        icon: '⌨️',
        title: { ja: 'ターミナル環境の準備', en: 'Setting Up Terminal' },
        goal: { ja: 'Docker コマンドを打つためのターミナル環境を用意し、基本操作を確認する', en: 'Set up a terminal for Docker commands and verify basic operations' },
        prereqs: ['0-1'],
        steps: [
            {
                title: { ja: 'ターミナルのセットアップ', en: 'Terminal Setup' },
                content: {
                    ja: 'OSに合わせてターミナル環境を整えましょう。',
                    en: 'Set up your terminal environment based on your OS.',
                },
                osSpecific: {
                    windows: {
                        ja: '**推奨: Git Bash**\n\n1. https://gitforwindows.org/ → ダウンロード → インストール（デフォルト設定でOK）\n2. オプション: Microsoft Store で「Windows Terminal」をインストール（Git Bash / PowerShell / WSL を統合管理）',
                        en: '**Recommended: Git Bash**\n\n1. https://gitforwindows.org/ → Download → Install (default settings OK)\n2. Optional: Install "Windows Terminal" from Microsoft Store (manages Git Bash / PowerShell / WSL)',
                    },
                    mac: {
                        ja: '**推奨: Terminal.app（標準搭載）**\n\nApplications/Utilities/Terminal.app を起動（Spotlight で "Terminal" 検索でもOK）\n\nオプション: iTerm2（https://iterm2.com/）も人気あり',
                        en: '**Recommended: Terminal.app (built-in)**\n\nOpen Applications/Utilities/Terminal.app (or search "Terminal" in Spotlight)\n\nOptional: iTerm2 (https://iterm2.com/) is also popular',
                    },
                },
            },
            {
                title: { ja: '基本コマンドの確認', en: 'Verify Basic Commands' },
                content: {
                    ja: 'ターミナルで以下のコマンドを実行し、正しく動くことを確認しましょう。',
                    en: 'Run the following commands in your terminal to verify they work.',
                },
                commands: ['pwd', 'ls', 'cd ~', 'mkdir docker-practice', 'cd docker-practice'],
            },
        ],
        checklist: [
            { ja: 'ターミナルが起動する', en: 'Terminal starts' },
            { ja: '`pwd` で現在のパスが表示される', en: '`pwd` shows current path' },
            { ja: '`docker-practice` フォルダが作成された', en: '`docker-practice` folder was created' },
        ],
        troubleshooting: [
            {
                symptom: { ja: 'Win: `ls` が PowerShell で動かない', en: 'Win: `ls` doesn\'t work in PowerShell' },
                fix: { ja: '`dir` を使うか、Git Bash に切り替える', en: 'Use `dir` or switch to Git Bash' },
            },
            {
                symptom: { ja: 'Win: Git Bash のパスが `/c/` 表記', en: 'Win: Git Bash shows `/c/` paths' },
                fix: { ja: 'Linux式パス表記。正常な動作です', en: 'Linux-style path notation. This is normal behavior' },
            },
        ],
    },

    {
        id: '0-3',
        level: 0,
        levelLabel: 'Lv.0',
        icon: '🐳',
        title: { ja: 'Docker Desktop のインストール', en: 'Install Docker Desktop' },
        goal: { ja: 'Docker Desktop をインストールし、`docker` コマンドが使える状態にする', en: 'Install Docker Desktop and verify `docker` commands work' },
        prereqs: ['0-2'],
        steps: [
            {
                title: { ja: 'Docker Desktop のインストール', en: 'Install Docker Desktop' },
                content: {
                    ja: '公式サイトからDocker Desktopをダウンロード・インストールします。',
                    en: 'Download and install Docker Desktop from the official site.',
                },
                osSpecific: {
                    windows: {
                        ja: '**1. WSL2 の有効化**\n```powershell\n# PowerShell を管理者として実行\nwsl --install\n```\n→ PC再起動\n\n**2. Docker Desktop インストール**\nhttps://www.docker.com/products/docker-desktop/ → ダウンロード → 「Use WSL 2 based engine」にチェック → 完了 → PC再起動',
                        en: '**1. Enable WSL2**\n```powershell\n# Run PowerShell as administrator\nwsl --install\n```\n→ Restart PC\n\n**2. Install Docker Desktop**\nhttps://www.docker.com/products/docker-desktop/ → Download → Check "Use WSL 2 based engine" → Finish → Restart PC',
                    },
                    mac: {
                        ja: 'https://www.docker.com/products/docker-desktop/ → **Apple Silicon (M1/M2/M3)** または **Intel** を選択 → `.dmg` を開き Applications にドラッグ',
                        en: 'https://www.docker.com/products/docker-desktop/ → Select **Apple Silicon** or **Intel** → Open `.dmg` → Drag to Applications',
                    },
                },
            },
            {
                title: { ja: '起動確認', en: 'Verify Startup' },
                content: {
                    ja: 'Docker Desktop を起動し、タスクバー（Win）/メニューバー（Mac）に 🐳 アイコンが表示され「Docker Desktop is running」の状態になるまで待ちます。',
                    en: 'Start Docker Desktop. Wait until the 🐳 icon appears in the taskbar (Win) / menu bar (Mac) and shows "Docker Desktop is running".',
                },
            },
            {
                title: { ja: 'バージョン確認', en: 'Check Version' },
                content: {
                    ja: 'ターミナルで以下のコマンドを実行して、Client と Server 両方のバージョンが表示されることを確認します。',
                    en: 'Run the following commands in your terminal and verify both Client and Server versions are shown.',
                },
                commands: ['docker version', 'docker info'],
            },
        ],
        checklist: [
            { ja: '`docker version` で Client / Server 両方表示される', en: '`docker version` shows both Client and Server' },
            { ja: '`docker info` でエラーなく情報が表示される', en: '`docker info` shows info without errors' },
            { ja: 'Docker Desktop のダッシュボードが開ける', en: 'Docker Desktop dashboard is accessible' },
        ],
        troubleshooting: [
            {
                symptom: { ja: 'Win: 「WSL 2 installation is incomplete」', en: 'Win: "WSL 2 installation is incomplete"' },
                fix: { ja: '`wsl --update` → 再起動', en: 'Run `wsl --update` → Restart' },
            },
            {
                symptom: { ja: 'Win: 「Hardware assisted virtualization is disabled」', en: 'Win: "Hardware assisted virtualization is disabled"' },
                fix: { ja: 'BIOS で VT-x（Intel）/ AMD-V（AMD）を有効化', en: 'Enable VT-x (Intel) / AMD-V (AMD) in BIOS' },
            },
            {
                symptom: { ja: '共通: `docker version` で Server 側が表示されない', en: 'Common: `docker version` doesn\'t show Server' },
                fix: { ja: 'Docker Desktop が起動中か確認（🐳 アイコン）', en: 'Check if Docker Desktop is running (🐳 icon)' },
            },
        ],
        tips: {
            ja: 'Docker Desktop は個人利用・学習用途は無料（Docker Personal プラン）。企業利用（250人超 or 年商1000万ドル超）は有料プランが必要。',
            en: 'Docker Desktop is free for personal/learning use (Docker Personal plan). Paid plans are required for larger enterprises.',
        },
    },

    {
        id: '0-4',
        level: 0,
        levelLabel: 'Lv.0',
        icon: '✅',
        title: { ja: '初期動作確認', en: 'Initial Verification' },
        goal: { ja: 'Docker が正しく動作することを hello-world で確認し、Docker Desktop のダッシュボードの見方を理解する', en: 'Verify Docker works with hello-world and understand the Docker Desktop dashboard' },
        prereqs: ['0-3'],
        steps: [
            {
                title: { ja: 'hello-world コンテナを実行', en: 'Run hello-world Container' },
                content: {
                    ja: '以下のコマンドを実行して、Docker の動作を確認します。\n\n「Hello from Docker!」というメッセージが表示されれば成功です。\n\n出力を読んでみましょう：\n- イメージがローカルに無い → 自動ダウンロード（pull）される\n- コンテナが起動してメッセージを出力\n- コンテナは自動的に停止',
                    en: 'Run the following command to verify Docker is working.\n\nIf you see "Hello from Docker!" the installation is successful.\n\nRead the output:\n- Image not found locally → automatically downloaded (pulled)\n- Container starts and prints message\n- Container automatically stops',
                },
                commands: ['docker run hello-world'],
            },
            {
                title: { ja: '実行後の確認', en: 'Post-Run Verification' },
                content: {
                    ja: '停止済みコンテナとダウンロードされたイメージを確認します。',
                    en: 'Check the stopped container and downloaded image.',
                },
                commands: ['docker ps -a', 'docker images'],
            },
            {
                title: { ja: 'Docker Desktop ダッシュボード確認', en: 'Check Docker Desktop Dashboard' },
                content: {
                    ja: 'Docker Desktop を開き、以下を確認します：\n\n- **Containers** タブ: hello-world コンテナが `Exited` 状態で見える\n- **Images** タブ: `hello-world` イメージが一覧に表示される',
                    en: 'Open Docker Desktop and check:\n\n- **Containers** tab: hello-world container shows as `Exited`\n- **Images** tab: `hello-world` image is listed',
                },
            },
            {
                title: { ja: '後片付け', en: 'Clean Up' },
                content: {
                    ja: '作成したコンテナとイメージを削除します。',
                    en: 'Remove the created container and image.',
                },
                commands: ['docker rm $(docker ps -aq)', 'docker rmi hello-world'],
            },
        ],
        checklist: [
            { ja: '「Hello from Docker!」が表示された', en: '"Hello from Docker!" was displayed' },
            { ja: '`docker ps -a` でコンテナ一覧が確認できた', en: '`docker ps -a` showed the container list' },
            { ja: 'Docker Desktop のダッシュボードでコンテナを確認できた', en: 'Verified container in Docker Desktop dashboard' },
        ],
        tips: {
            ja: '`docker run` は「イメージの取得 → コンテナ作成 → 起動」を一度に行うコマンドです。hello-world はメッセージ表示後すぐに終了します。',
            en: '`docker run` performs "pull image → create container → start" in one command. hello-world exits immediately after printing.',
        },
    },

    // ─────────────────────────────────────
    // Lv.1 Docker 基礎操作
    // ─────────────────────────────────────

    {
        id: '1-1',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '🚀',
        title: { ja: 'コンテナを起動してみよう', en: 'Start a Container' },
        goal: { ja: 'nginx コンテナを起動し、ブラウザで Welcome ページが表示されることを確認する', en: 'Start an nginx container and verify the Welcome page in a browser' },
        prereqs: ['0-4'],
        steps: [
            {
                title: { ja: 'nginx をバックグラウンドで起動', en: 'Start nginx in Background' },
                content: {
                    ja: '以下のコマンドで nginx コンテナを起動します。\n\n**オプション解説:**\n- `-d` : バックグラウンド実行（デタッチモード）\n- `-p 8080:80` : ホストの 8080 番ポート → コンテナの 80 番ポート',
                    en: 'Start an nginx container with the following command.\n\n**Options:**\n- `-d`: Run in background (detach mode)\n- `-p 8080:80`: Map host port 8080 → container port 80',
                },
                commands: ['docker run -d -p 8080:80 nginx'],
            },
            {
                title: { ja: 'ブラウザで確認', en: 'Check in Browser' },
                content: {
                    ja: 'ブラウザを開いて以下にアクセスしてください：\n\n```\nhttp://localhost:8080\n```\n\n→ **「Welcome to nginx!」** が表示されれば成功！',
                    en: 'Open your browser and go to:\n\n```\nhttp://localhost:8080\n```\n\n→ If **"Welcome to nginx!"** is shown, you\'re done!',
                },
            },
            {
                title: { ja: 'コンテナの状態を確認', en: 'Check Container Status' },
                content: {
                    ja: '起動中のコンテナを一覧表示します。STATUS が `Up` になっていることを確認しましょう。',
                    en: 'List running containers and verify STATUS shows `Up`.',
                },
                commands: ['docker ps'],
            },
        ],
        checklist: [
            { ja: '`docker run` でエラーなく起動した', en: '`docker run` started without errors' },
            { ja: 'ブラウザで「Welcome to nginx!」が見えた', en: '"Welcome to nginx!" is visible in browser' },
            { ja: '`docker ps` でコンテナが `Up` 状態', en: '`docker ps` shows container as `Up`' },
        ],
        troubleshooting: [
            {
                symptom: { ja: '「port is already allocated」', en: '"port is already allocated"' },
                fix: { ja: 'ポート 8080 が使用中。`-p 8081:80` に変える', en: 'Port 8080 is in use. Change to `-p 8081:80`' },
            },
            {
                symptom: { ja: 'ブラウザで表示されない', en: 'Browser shows nothing' },
                fix: { ja: '`docker ps` でコンテナが起動しているか確認 / `localhost` で試す', en: 'Check `docker ps` to see if container is running / Try `localhost`' },
            },
        ],
    },

    {
        id: '1-2',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '📋',
        title: { ja: 'コンテナの状態を確認', en: 'Check Container Status' },
        goal: { ja: '起動中・停止中のコンテナの一覧確認、ログの見方を覚える', en: 'Learn to check running/stopped containers and view logs' },
        prereqs: ['1-1'],
        steps: [
            {
                title: { ja: '起動中のコンテナ一覧', en: 'List Running Containers' },
                content: { ja: '現在起動中のコンテナだけを表示します。', en: 'Show only currently running containers.' },
                commands: ['docker ps'],
            },
            {
                title: { ja: '全コンテナ一覧（停止中を含む）', en: 'List All Containers (Including Stopped)' },
                content: {
                    ja: '`-a` オプションで停止中のコンテナも表示します。`STATUS` 列で `Up` / `Exited` の違いを確認しましょう。',
                    en: 'Use `-a` option to show stopped containers too. Check the `STATUS` column for `Up` / `Exited` differences.',
                },
                commands: ['docker ps -a'],
            },
            {
                title: { ja: 'コンテナのログを確認', en: 'View Container Logs' },
                content: {
                    ja: 'コンテナの出力ログを確認します。ブラウザで `http://localhost:8080` をリロードして、ログにアクセス記録が流れることを確認しましょう。\n\n`-f` オプションでリアルタイム追跡できます（Ctrl+C で停止）。',
                    en: 'Check container output logs. Reload `http://localhost:8080` in browser and watch access logs appear.\n\n`-f` option enables real-time follow (Ctrl+C to stop).',
                },
                commands: ['docker logs <CONTAINER_ID>', 'docker logs -f <CONTAINER_ID>'],
            },
        ],
        checklist: [
            { ja: '`docker ps` と `docker ps -a` の違いがわかった', en: 'Understand difference between `docker ps` and `docker ps -a`' },
            { ja: '`docker logs` でアクセスログが見えた', en: 'Viewed access logs with `docker logs`' },
            { ja: '`docker logs -f` でリアルタイム追跡ができた', en: 'Used `docker logs -f` for real-time follow' },
        ],
    },

    {
        id: '1-3',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '🧹',
        title: { ja: 'コンテナを止めて片付けよう', en: 'Stop and Clean Up Containers' },
        goal: { ja: 'コンテナの停止・削除、不要なイメージの後片付けができる', en: 'Stop, remove containers, and clean up unused images' },
        prereqs: ['1-1'],
        steps: [
            {
                title: { ja: 'コンテナを停止', en: 'Stop a Container' },
                content: {
                    ja: 'コンテナIDは `docker ps` で確認。先頭4〜5文字でもOKです。',
                    en: 'Check container ID with `docker ps`. First 4-5 characters are enough.',
                },
                commands: ['docker stop <CONTAINER_ID>'],
            },
            {
                title: { ja: '停止を確認', en: 'Verify Stop' },
                content: {
                    ja: '`docker ps` で何も出ない（起動中なし）、`docker ps -a` で Exited 状態で残っていることを確認。',
                    en: '`docker ps` shows nothing (none running), `docker ps -a` shows Exited status.',
                },
                commands: ['docker ps', 'docker ps -a'],
            },
            {
                title: { ja: 'コンテナを削除', en: 'Remove Container' },
                content: { ja: '停止したコンテナを削除します。', en: 'Remove the stopped container.' },
                commands: ['docker rm <CONTAINER_ID>'],
            },
            {
                title: { ja: 'まとめて後片付け（便利コマンド）', en: 'Bulk Clean Up (Useful Commands)' },
                content: {
                    ja: '停止中のコンテナや使われていないイメージを一括削除できます。',
                    en: 'Bulk remove stopped containers and unused images.',
                },
                commands: ['docker container prune', 'docker image prune'],
            },
        ],
        checklist: [
            { ja: '`docker stop` → `docker rm` でコンテナを片付けた', en: 'Cleaned up with `docker stop` → `docker rm`' },
            { ja: '`docker ps -a` でコンテナが消えたことを確認', en: 'Verified container is gone with `docker ps -a`' },
            { ja: 'ブラウザで `localhost:8080` にアクセスできなくなった', en: '`localhost:8080` is no longer accessible' },
        ],
        troubleshooting: [
            {
                symptom: { ja: '「container is running」で rm できない', en: '"container is running" prevents rm' },
                fix: { ja: '先に `docker stop` するか、`docker rm -f` で強制削除', en: 'First `docker stop` or use `docker rm -f` for force removal' },
            },
        ],
    },

    {
        id: '1-4',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '🔍',
        title: { ja: 'コンテナの中に入ってみよう', en: 'Get Inside a Container' },
        goal: { ja: 'コンテナ内でシェル操作を体験し、ホストとコンテナの環境が分離されていることを実感する', en: 'Experience shell operations inside a container and understand host-container isolation' },
        prereqs: ['1-1'],
        steps: [
            {
                title: { ja: 'ubuntu コンテナを対話モードで起動', en: 'Start Ubuntu in Interactive Mode' },
                content: {
                    ja: '`-it` = 対話モード（`-i` 標準入力を開く + `-t` 仮想端末を割り当て）\n\nプロンプトが `root@xxx:/#` に変わります。',
                    en: '`-it` = interactive mode (`-i` open stdin + `-t` allocate pseudo-TTY)\n\nPrompt changes to `root@xxx:/#`.',
                },
                commands: ['docker run -it ubuntu bash'],
            },
            {
                title: { ja: 'コンテナ内を探索', en: 'Explore Inside' },
                content: {
                    ja: 'コンテナ内のOS情報やファイルを確認しましょう。ホストにある自分のファイルは見えない（＝別世界）ことを確認！',
                    en: 'Check OS info and files inside the container. Notice your host files are not visible (separate world)!',
                },
                commands: ['cat /etc/os-release', 'whoami', 'ls /', 'ls /home'],
            },
            {
                title: { ja: 'コンテナから出る', en: 'Exit Container' },
                content: { ja: '`exit` でコンテナから出ます（コンテナも停止します）。', en: 'Type `exit` to leave (container also stops).' },
                commands: ['exit'],
            },
            {
                title: { ja: '稼働中コンテナに入り直す（exec）', en: 'Enter a Running Container (exec)' },
                content: {
                    ja: '`docker exec` は稼働中のコンテナに**追加のプロセス**としてシェルを起動します。コンテナを止めずに中を調べたい時に便利！',
                    en: '`docker exec` starts a shell as an **additional process** in a running container. Useful for inspection without stopping!',
                },
                commands: ['docker run -d --name my-nginx nginx', 'docker exec -it my-nginx bash', 'cat /etc/nginx/nginx.conf', 'exit'],
            },
            {
                title: { ja: '後片付け', en: 'Clean Up' },
                content: { ja: '使ったコンテナを停止・削除します。', en: 'Stop and remove used containers.' },
                commands: ['docker stop my-nginx', 'docker rm my-nginx'],
            },
        ],
        checklist: [
            { ja: '`docker run -it ubuntu bash` でコンテナ内に入れた', en: 'Entered container with `docker run -it ubuntu bash`' },
            { ja: '`whoami` で `root` と表示された', en: '`whoami` showed `root`' },
            { ja: 'ホストのファイルがコンテナ内に無いことを確認', en: 'Verified host files are not inside container' },
            { ja: '`docker exec` で稼働中コンテナに入れた', en: 'Entered running container with `docker exec`' },
        ],
    },

    {
        id: '1-5',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '🔌',
        title: { ja: 'ポート公開とアクセス確認', en: 'Port Mapping & Access' },
        goal: { ja: '複数コンテナを異なるポートで起動し、ポートマッピングの仕組みを理解する', en: 'Start multiple containers on different ports and understand port mapping' },
        prereqs: ['1-1', '1-3'],
        steps: [
            {
                title: { ja: '2つのコンテナを別ポートで起動', en: 'Start 2 Containers on Different Ports' },
                content: {
                    ja: '同じ nginx イメージから2つのコンテナを起動し、異なるポートで公開します。',
                    en: 'Start two containers from the same nginx image, exposed on different ports.',
                },
                commands: [
                    'docker run -d --name web-a -p 8080:80 nginx',
                    'docker run -d --name web-b -p 8081:80 nginx',
                ],
            },
            {
                title: { ja: 'ブラウザで両方にアクセス', en: 'Access Both in Browser' },
                content: {
                    ja: '以下の2つのURLにアクセスして、両方とも「Welcome to nginx!」が表示されることを確認します：\n\n- `http://localhost:8080` → コンテナA\n- `http://localhost:8081` → コンテナB\n\n→ **同じ表示が別々のコンテナから**返されています！',
                    en: 'Access both URLs and verify "Welcome to nginx!" shows on each:\n\n- `http://localhost:8080` → Container A\n- `http://localhost:8081` → Container B\n\n→ **Same page served from separate containers!**',
                },
            },
            {
                title: { ja: '片方を止めてテスト', en: 'Stop One and Test' },
                content: {
                    ja: '片方のコンテナだけを止めて、もう片方が影響を受けないことを確認します。\n\n- `localhost:8080` → **アクセス不可**\n- `localhost:8081` → **まだ表示される**\n\n→ コンテナが個別に独立して動作していることを体験！',
                    en: 'Stop one container and verify the other is unaffected.\n\n- `localhost:8080` → **Inaccessible**\n- `localhost:8081` → **Still works**\n\n→ Containers operate independently!',
                },
                commands: ['docker stop web-a'],
            },
            {
                title: { ja: '後片付け', en: 'Clean Up' },
                content: { ja: '全コンテナを停止・削除します。', en: 'Stop and remove all containers.' },
                commands: ['docker stop web-b', 'docker rm web-a web-b'],
            },
        ],
        checklist: [
            { ja: '2つのコンテナが異なるポートで同時に動いた', en: 'Two containers ran simultaneously on different ports' },
            { ja: '片方を止めてもう片方が影響を受けないことを確認', en: 'Verified stopping one doesn\'t affect the other' },
        ],
        tips: {
            ja: '`-p ホスト:コンテナ` の形式。ホスト側のポートは自由に変えられるが、同じホスト側ポートを2つのコンテナに割り当てるとエラーになります。',
            en: '`-p host:container` format. Host port can be changed freely, but assigning the same host port to two containers causes an error.',
        },
    },

    {
        id: '1-6',
        level: 1,
        levelLabel: 'Lv.1',
        icon: '💾',
        title: { ja: 'データを残そう（ボリューム）', en: 'Persist Data (Volumes)' },
        goal: { ja: 'コンテナを削除してもデータが残る「ボリューム」と、ホストのフォルダを接続する「バインドマウント」を体験する', en: 'Experience volumes (data survives deletion) and bind mounts (connect host folders)' },
        prereqs: ['1-1', '1-3'],
        steps: [
            {
                title: { ja: 'パートA: ボリュームを使う', en: 'Part A: Using Volumes' },
                content: {
                    ja: 'Docker が管理する永続化領域「ボリューム」にデータを保存し、コンテナを削除してもデータが残ることを確認します。',
                    en: 'Save data to a Docker-managed "volume" and verify data persists after container removal.',
                },
                commands: [
                    'docker volume create mydata',
                    'docker volume ls',
                    'docker run -it -v mydata:/data ubuntu bash',
                ],
            },
            {
                title: { ja: 'ボリュームにデータを書き込む', en: 'Write Data to Volume' },
                content: {
                    ja: 'コンテナ内で `/data` にファイルを作成し、`exit` で出ます。コンテナを削除した後、新しいコンテナで同じボリュームをマウントしてデータが残っていることを確認しましょう！',
                    en: 'Create a file in `/data` inside the container, `exit`, remove the container. Then mount the same volume in a new container and verify data persists!',
                },
                commands: [
                    'echo "Hello from container!" > /data/test.txt',
                    'cat /data/test.txt',
                    'exit',
                ],
            },
            {
                title: { ja: 'パートB: バインドマウントを使う', en: 'Part B: Using Bind Mounts' },
                content: {
                    ja: 'ホスト側のフォルダをコンテナにマウントし、ホストでの変更がリアルタイムにコンテナに反映されることを体験します。ブラウザで確認してみましょう！',
                    en: 'Mount a host folder into a container and experience real-time changes. Check in your browser!',
                },
                commands: [
                    'mkdir -p ~/docker-practice/html',
                    'echo "<h1>Hello Docker!</h1>" > ~/docker-practice/html/index.html',
                    'docker run -d -p 8080:80 -v ~/docker-practice/html:/usr/share/nginx/html:ro nginx',
                ],
            },
            {
                title: { ja: 'リアルタイム反映を確認', en: 'Verify Real-Time Update' },
                content: {
                    ja: '`http://localhost:8080` で「Hello Docker!」→ ホスト側でファイルを更新 → ブラウザリロードで「Updated!」に変わることを確認！',
                    en: '`http://localhost:8080` shows "Hello Docker!" → Update the file on host → Browser reload shows "Updated!"',
                },
                commands: ['echo "<h1>Updated!</h1>" > ~/docker-practice/html/index.html'],
            },
            {
                title: { ja: '後片付け', en: 'Clean Up' },
                content: { ja: '全コンテナ停止、ボリューム削除。', en: 'Stop all containers and remove volumes.' },
                commands: ['docker stop $(docker ps -q)', 'docker container prune', 'docker volume rm mydata'],
            },
        ],
        checklist: [
            { ja: 'ボリューム: コンテナ削除後もデータが残ることを確認', en: 'Volume: Data persists after container removal' },
            { ja: 'バインドマウント: ホストの変更がリアルタイム反映', en: 'Bind Mount: Host changes reflected in real-time' },
            { ja: 'ボリュームとバインドマウントの違いが説明できる', en: 'Can explain difference between volumes and bind mounts' },
        ],
        tips: {
            ja: '**ボリューム** = Docker管理、DBデータ等の永続化向き。\n**バインドマウント** = ユーザー管理、開発中のソースコード共有向き。',
            en: '**Volumes** = Docker-managed, good for DB data persistence.\n**Bind Mounts** = User-managed, good for sharing source code during development.',
        },
    },
];

// ── Helper functions ──

export function getPracticeExercise(id: string): PracticeExercise | undefined {
    return practiceExercises.find(e => e.id === id);
}

export function getPracticesByLevel(level: number): PracticeExercise[] {
    return practiceExercises.filter(e => e.level === level);
}
