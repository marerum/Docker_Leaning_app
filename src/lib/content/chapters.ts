// Chapter content definitions for the curriculum
// Structure: technology > course > chapter hierarchy (future DB-compatible)

export interface ChapterSection {
    id: string;
    type: 'intro' | 'concept' | 'simulation' | 'local_practice' | 'checkpoint';
}

export interface SimulationStep {
    prompt: { ja: string; en: string };
    expectedCommand: string;
    alternativeCommands?: string[];
    output: string;
    hint: { ja: string; en: string };
    xp: number;
}

export interface CheckpointQuestion {
    question: { ja: string; en: string };
    options: { ja: string; en: string }[];
    correctIndex: number;
    explanation: { ja: string; en: string };
}

export interface ChapterData {
    id: number;
    slug: string;
    level: number;
    icon: string;
    title: { ja: string; en: string };

    // Intro section
    intro: {
        overview: { ja: string; en: string };
        why: { ja: string; en: string };
        before: { ja: string; en: string };
        after: { ja: string; en: string };
    };

    // Goals
    goals: { ja: string; en: string }[];

    // Concept
    concept: {
        content: { ja: string; en: string };
    };

    // Simulation exercises
    simulation: SimulationStep[];

    // Local practice guidance
    localPractice: {
        instructions: { ja: string; en: string };
        commands: string[];
    };

    // Checkpoint quiz
    checkpoint: CheckpointQuestion[];

    // XP for completing chapter
    completionXP: number;
}

// ===== CHAPTER DATA =====

export const chapters: ChapterData[] = [
    // ─────────────────────────────────────────────
    // Level 1: Docker 基礎
    // ─────────────────────────────────────────────
    {
        id: 1,
        slug: 'what-is-docker',
        level: 1,
        icon: '🐳',
        title: { ja: 'Dockerって何？', en: 'What is Docker?' },
        intro: {
            overview: {
                ja: 'この章では、Dockerの全体像を理解します。なぜDockerが生まれたのか、従来の仮想マシンとどう違うのかを学びます。',
                en: 'In this chapter, you\'ll understand the big picture of Docker. Learn why Docker was created and how it differs from traditional virtual machines.',
            },
            why: {
                ja: 'あなたが作ったアプリケーションが「自分のPCでは動くのに、他の環境では動かない」という経験はありませんか？Dockerはこの「環境の壁」問題を根本から解決します。',
                en: 'Have you ever experienced an app that "works on my machine" but fails elsewhere? Docker fundamentally solves this "environment gap" problem.',
            },
            before: {
                ja: '「自分のPCでは動くのに…」問題。環境ごとにライブラリやバージョンが異なり、再現性がない。',
                en: '"Works on my machine" problems. Libraries and versions differ across environments with no reproducibility.',
            },
            after: {
                ja: 'Dockerを使えば、どのPC・どのサーバーでも完全に同じ環境を再現できます。',
                en: 'With Docker, you can reproduce the exact same environment on any PC or server.',
            },
        },
        goals: [
            { ja: 'Dockerが何であるか説明できる', en: 'Be able to explain what Docker is' },
            { ja: 'コンテナと仮想マシンの違いが分かる', en: 'Understand the difference between containers and VMs' },
            { ja: 'docker version コマンドを実行できる', en: 'Be able to run the docker version command' },
        ],
        concept: {
            content: {
                ja: '## コンテナとは？\n\nDockerのコンテナは**アプリケーションとその実行環境をまとめたパッケージ**です。\n\n荷物を運ぶ「コンテナ」のように、アプリに必要なもの全てを一つの箱に詰め込みます。\n\n### 仮想マシン(VM) vs コンテナ\n\n| | 仮想マシン | コンテナ |\n|---|---|---|\n| 起動速度 | 数分 | 数秒 |\n| サイズ | 数GB | 数十MB |\n| OS | 各VMが個別OS | ホストOSを共有 |\n| オーバーヘッド | 大きい | 最小限 |',
                en: '## What is a Container?\n\nA Docker container is **a package that bundles an application with its runtime environment**.\n\nLike a shipping container, it packs everything your app needs into a single box.\n\n### Virtual Machines vs Containers\n\n| | Virtual Machine | Container |\n|---|---|---|\n| Startup | Minutes | Seconds |\n| Size | Several GB | Tens of MB |\n| OS | Each VM has its own OS | Shares host OS |\n| Overhead | Heavy | Minimal |',
            },
        },
        simulation: [
            {
                prompt: {
                    ja: 'まずDockerが正しくインストールされているか確認しましょう。以下のコマンドを入力してください。',
                    en: 'Let\'s first check if Docker is installed correctly. Enter the following command.',
                },
                expectedCommand: 'docker version',
                alternativeCommands: ['docker --version'],
                output: `Client:
 Version:           24.0.7
 API version:       1.43
 Go version:        go1.21.3
 Built:             Thu Oct 26 09:08:17 2023
 OS/Arch:           linux/amd64

Server:
 Engine:
  Version:          24.0.7
  API version:      1.43
  Go version:       go1.21.3`,
                hint: { ja: 'docker version と入力してみましょう', en: 'Try typing: docker version' },
                xp: 20,
            },
            {
                prompt: {
                    ja: 'Docker の詳細情報を見てみましょう。',
                    en: 'Let\'s see Docker\'s detailed information.',
                },
                expectedCommand: 'docker info',
                output: `Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 24.0.7
Storage Driver: overlay2
Logging Driver: json-file
Operating System: Docker Desktop
CPUs: 8
Total Memory: 7.748GiB`,
                hint: { ja: 'docker info で詳細情報が見られます', en: 'Use docker info to see details' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'あなたのPCでも同じコマンドを実行してみましょう！Docker Desktopが起動していることを確認してから試してください。',
                en: 'Try running the same commands on your PC! Make sure Docker Desktop is running first.',
            },
            commands: ['docker version', 'docker info'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Dockerコンテナと仮想マシンの最大の違いは何ですか？',
                    en: 'What is the biggest difference between Docker containers and virtual machines?',
                },
                options: [
                    { ja: 'コンテナの方が価格が安い', en: 'Containers are cheaper' },
                    { ja: 'コンテナはホストOSを共有し、軽量で高速', en: 'Containers share the host OS, making them lightweight and fast' },
                    { ja: 'コンテナの方がセキュリティが高い', en: 'Containers are more secure' },
                    { ja: '違いはない', en: 'There is no difference' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'コンテナはホストOSのカーネルを共有するため、各VMが個別のOSを必要とする仮想マシンと比べて、軽量で起動が高速です。',
                    en: 'Containers share the host OS kernel, making them lightweight and fast to start compared to VMs, which each require their own OS.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 2
    {
        id: 2,
        slug: 'first-container',
        level: 1,
        icon: '📦',
        title: { ja: 'はじめてのコンテナ', en: 'Your First Container' },
        intro: {
            overview: {
                ja: 'この章では、実際にコンテナを動かしてみます。「イメージ」と「コンテナ」の関係を理解し、最初の docker run を体験します。',
                en: 'In this chapter, you\'ll actually run a container. Understand the relationship between "images" and "containers" and experience your first docker run.',
            },
            why: {
                ja: 'Dockerを使う基本は「イメージからコンテナを作る」ことです。これは料理で言えば「レシピから料理を作る」のと同じです。この基本を理解すれば、あらゆるDockerの操作が腑に落ちます。',
                en: 'The Docker basics come down to "creating containers from images." Think of it as "cooking a dish from a recipe." Understanding this foundation makes all Docker operations click.',
            },
            before: {
                ja: 'ソフトウェアの環境構築に複雑な手順が必要。手順書通りにやっても動かないことも。',
                en: 'Complex setup procedures needed. Even following docs step-by-step might not work.',
            },
            after: {
                ja: 'docker run 一つでアプリケーションが即座に動く。',
                en: 'A single docker run command instantly starts an application.',
            },
        },
        goals: [
            { ja: 'イメージとコンテナの関係を説明できる', en: 'Explain the image-container relationship' },
            { ja: 'docker run でコンテナを起動できる', en: 'Start a container with docker run' },
            { ja: 'コンテナの一覧を確認できる', en: 'List running containers' },
        ],
        concept: {
            content: {
                ja: '## イメージとコンテナ\n\n- **イメージ** = レシピ（設計図）。読み取り専用のテンプレート\n- **コンテナ** = 料理（実体）。イメージから作られた実行中のインスタンス\n\n一つのイメージから何個でもコンテナを作れます。\n\n```\nイメージ (nginx:latest)\n  ├── コンテナA (稼働中)\n  ├── コンテナB (停止)\n  └── コンテナC (稼働中)\n```',
                en: '## Images and Containers\n\n- **Image** = Recipe (blueprint). A read-only template\n- **Container** = Dish (instance). A running instance created from an image\n\nYou can create multiple containers from a single image.\n\n```\nImage (nginx:latest)\n  ├── Container A (running)\n  ├── Container B (stopped)\n  └── Container C (running)\n```',
            },
        },
        simulation: [
            {
                prompt: {
                    ja: 'Docker公式の hello-world イメージを実行してみましょう！',
                    en: 'Let\'s run the official Docker hello-world image!',
                },
                expectedCommand: 'docker run hello-world',
                output: `Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
719385e32844: Pull complete
Digest: sha256:dcba6daec718f547568c562956fa47e1b03673dd010fe6ee58ca806767031d1c
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image.
 4. The Docker daemon streamed that output to the Docker client.`,
                hint: { ja: 'docker run hello-world と入力してみましょう', en: 'Try: docker run hello-world' },
                xp: 20,
            },
            {
                prompt: {
                    ja: 'どんなコンテナが存在するか確認しましょう（停止中のものも含む）',
                    en: 'Check what containers exist (including stopped ones)',
                },
                expectedCommand: 'docker ps -a',
                alternativeCommands: ['docker container ls -a'],
                output: `CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     NAMES
a1b2c3d4e5f6   hello-world   "/hello"   2 seconds ago   Exited (0) 1 second ago    happy_whale`,
                hint: { ja: 'docker ps -a で全コンテナを表示できます', en: 'Use docker ps -a to show all containers' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '自分のPCでも docker run hello-world を実行してみましょう！出力メッセージを読んで、Dockerが裏側で何をしたか確認してください。',
                en: 'Run docker run hello-world on your own PC! Read the output to understand what Docker did behind the scenes.',
            },
            commands: ['docker run hello-world', 'docker ps -a'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'イメージとコンテナの関係として正しいものはどれですか？',
                    en: 'Which correctly describes the image-container relationship?',
                },
                options: [
                    { ja: 'イメージとコンテナは同じもの', en: 'Images and containers are the same thing' },
                    { ja: 'イメージは設計図、コンテナは実行中のインスタンス', en: 'An image is a blueprint, a container is a running instance' },
                    { ja: '一つのイメージからは一つのコンテナしか作れない', en: 'Only one container can be created from an image' },
                    { ja: 'コンテナからイメージを作ることはできない', en: 'You cannot create an image from a container' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'イメージは読み取り専用の設計図であり、一つのイメージから複数のコンテナ（実行中のインスタンス）を作成できます。',
                    en: 'An image is a read-only blueprint, and multiple containers (running instances) can be created from a single image.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 3
    {
        id: 3,
        slug: 'managing-containers',
        level: 1,
        icon: '⚙️',
        title: { ja: 'コンテナを操る', en: 'Managing Containers' },
        intro: {
            overview: {
                ja: 'コンテナのライフサイクル（起動・停止・再起動・削除）を学びます。実際の開発では、必要に応じてコンテナを管理する操作が日常的に必要です。',
                en: 'Learn the container lifecycle (start, stop, restart, remove). In real development, managing containers is a daily routine.',
            },
            why: {
                ja: 'アプリケーションの管理はライフサイクル管理です。Webサーバーを起動し、更新時に再起動し、不要になったら削除する — これらの操作を知ることが、Dockerを「使いこなす」第一歩です。',
                en: 'Application management is lifecycle management. Starting a web server, restarting on update, removing when done — knowing these operations is the first step to mastering Docker.',
            },
            before: { ja: 'プロセスの管理が煩雑で、ゾンビプロセスが残ることも。', en: 'Process management is messy, zombie processes may remain.' },
            after: { ja: 'コンテナで明確なライフサイクル管理。起動・停止・削除がワンコマンド。', en: 'Clear lifecycle management with containers. Start, stop, remove in one command.' },
        },
        goals: [
            { ja: 'コンテナの起動・停止・削除ができる', en: 'Start, stop, and remove containers' },
            { ja: 'docker ps で稼働中のコンテナを確認できる', en: 'Check running containers with docker ps' },
            { ja: 'バックグラウンドでコンテナを実行できる', en: 'Run containers in the background' },
        ],
        concept: {
            content: {
                ja: '## コンテナのライフサイクル\n\n```\n作成 → 起動 → (実行中) → 停止 → 削除\n │      │                │      │\ncreate  start             stop   rm\n └── run (create + start) ──┘\n```\n\n### よく使うコマンド\n- `docker run -d` : バックグラウンドで起動（-d = detach）\n- `docker ps` : 稼働中のコンテナ一覧\n- `docker stop <ID>` : コンテナを停止\n- `docker rm <ID>` : コンテナを削除\n\n---\n\n## 🌐 本カリキュラムで使う「nginx」とは？\n\n本カリキュラムの練習では、主に **nginx（エンジンエックス）** というイメージを使います。\n\nnginx は世界中で広く使われている**軽量なWebサーバー**です。Docker公式イメージが提供されており、`docker run` するだけでWebサーバーが即座に立ち上がるため、Dockerの練習に最適です。\n\n```\ndocker run -d nginx\n```\n\nこのコマンドで、nginx の公式イメージからコンテナが作成され、Webサーバーとして起動します。\n\n### 💡 補足：nginx 以外のよく使うイメージ\n\n`docker run -d` の後に指定するのは**Docker イメージ名**です。他にも様々なイメージがあります：\n\n| イメージ名 | 説明 |\n|-----------|------|\n| `nginx` | 軽量Webサーバー。静的サイトのホスティング等に使用 |\n| `httpd` | Apache HTTP Server。定番Webサーバー |\n| `ubuntu` | Ubuntu OS。Linux コマンドの練習に便利 |\n| `node` | Node.js 実行環境。JavaScriptアプリの開発に |\n| `python` | Python 実行環境。スクリプトの開発に |\n| `postgres` | PostgreSQL データベース |\n\nnginx 以外でも試したい場合は、`docker run -d` の後のイメージ名を変えるだけです。',
                en: '## Container Lifecycle\n\n```\nCreate → Start → (Running) → Stop → Remove\n │       │                  │      │\ncreate   start              stop   rm\n └── run (create + start) ──┘\n```\n\n### Common Commands\n- `docker run -d` : Run in background (-d = detach)\n- `docker ps` : List running containers\n- `docker stop <ID>` : Stop a container\n- `docker rm <ID>` : Remove a container\n\n---\n\n## 🌐 About "nginx" Used in This Curriculum\n\nIn this curriculum, we mainly use **nginx (engine-x)** images for practice.\n\nnginx is a widely-used **lightweight web server**. Docker provides an official image, and a single `docker run` command instantly starts a web server — making it perfect for Docker practice.\n\n```\ndocker run -d nginx\n```\n\nThis command creates a container from the official nginx image and starts it as a web server.\n\n### 💡 Supplement: Other Common Images\n\nThe name after `docker run -d` is a **Docker image name**. Many other images are available:\n\n| Image | Description |\n|-------|-------------|\n| `nginx` | Lightweight web server |\n| `httpd` | Apache HTTP Server |\n| `ubuntu` | Ubuntu OS. Great for Linux command practice |\n| `node` | Node.js runtime |\n| `python` | Python runtime |\n| `postgres` | PostgreSQL database |\n\nTo try other images, just change the image name after `docker run -d`.',
            },
        },
        simulation: [
            {
                prompt: { ja: 'nginx をバックグラウンドで起動してみましょう', en: 'Start nginx in the background' },
                expectedCommand: 'docker run -d nginx',
                alternativeCommands: ['docker run -d nginx:latest'],
                output: `Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
Digest: sha256:abc123...
Status: Downloaded newer image for nginx:latest
f8a3b5c7d9e2...`,
                hint: { ja: '-d オプションをつけるとバックグラウンドで実行できます', en: 'Use -d flag to run in background' },
                xp: 20,
            },
            {
                prompt: { ja: '稼働中のコンテナを確認しましょう', en: 'Check running containers' },
                expectedCommand: 'docker ps',
                alternativeCommands: ['docker container ls'],
                output: `CONTAINER ID   IMAGE   COMMAND                  CREATED          STATUS          PORTS     NAMES
f8a3b5c7d9e2   nginx   "/docker-entrypoint.…"   10 seconds ago   Up 9 seconds    80/tcp    epic_darwin`,
                hint: { ja: 'docker ps で稼働中コンテナを確認', en: 'Use docker ps to see running containers' },
                xp: 20,
            },
            {
                prompt: { ja: 'コンテナを停止しましょう（IDの先頭数文字でOK）', en: 'Stop the container (first few chars of ID)' },
                expectedCommand: 'docker stop f8a3',
                alternativeCommands: ['docker stop f8a3b5c7d9e2', 'docker stop epic_darwin'],
                output: 'f8a3',
                hint: { ja: 'docker stop <ID> でコンテナを停止できます', en: 'Use docker stop <ID> to stop a container' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '自分のPCで nginx コンテナを起動・確認・停止・削除してみましょう！',
                en: 'Start, check, stop, and remove an nginx container on your own PC!',
            },
            commands: ['docker run -d nginx', 'docker ps', 'docker stop <CONTAINER_ID>', 'docker rm <CONTAINER_ID>'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'コンテナをバックグラウンドで実行するオプションはどれですか？',
                    en: 'Which option runs a container in the background?',
                },
                options: [
                    { ja: '-b', en: '-b' },
                    { ja: '-d', en: '-d' },
                    { ja: '-bg', en: '-bg' },
                    { ja: '--background', en: '--background' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: '-d (detach) オプションでコンテナをバックグラウンドで実行できます。',
                    en: 'The -d (detach) option runs the container in the background.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 4
    {
        id: 4,
        slug: 'inside-container',
        level: 1,
        icon: '🔍',
        title: { ja: 'コンテナの中に入ろう', en: 'Get Inside a Container' },
        intro: {
            overview: {
                ja: 'コンテナの中に入って対話的に操作する方法を学びます。デバッグや設定確認など、実務で必須のスキルです。',
                en: 'Learn how to enter a container and interact with it. Essential skills for debugging and configuration checks in real work.',
            },
            why: {
                ja: 'コンテナの中で何が起きているか確認したい場面は頻繁にあります。ログを見たり、設定ファイルを確認したり、問題を調査したり — 対話操作はDockerを使いこなすための重要なスキルです。',
                en: 'You\'ll frequently need to check what\'s happening inside a container. Viewing logs, checking configs, investigating issues — interactive access is crucial for mastering Docker.',
            },
            before: { ja: 'アプリケーション内部の状態確認が困難。ログの確認や設定の確認に手間がかかる。', en: 'Difficult to inspect application internals. Checking logs and configs is cumbersome.' },
            after: { ja: 'docker exec でコンテナ内部に即座にアクセス。リアルタイムでデバッグ可能。', en: 'Instant access inside containers with docker exec. Debug in real-time.' },
        },
        goals: [
            { ja: 'docker run -it で対話モードを使える', en: 'Use interactive mode with docker run -it' },
            { ja: 'docker exec で稼働中コンテナに入れる', en: 'Enter a running container with docker exec' },
            { ja: 'コンテナ内でコマンドを実行できる', en: 'Execute commands inside a container' },
        ],
        concept: {
            content: {
                ja: '## 対話モードとは？\n\n`-i` (interactive) と `-t` (TTY) を組み合わせた `-it` オプションで、コンテナの中にターミナルを開きます。\n\n### 2つのアプローチ\n- **docker run -it**: 新しいコンテナを作って中に入る\n- **docker exec -it**: 既に動いているコンテナに入る\n\n```\n# 新しいコンテナを作って中に入る\ndocker run -it ubuntu bash\n\n# 稼働中のコンテナに入る\ndocker exec -it <ID> bash\n```\n\n`exec` は稼働中のコンテナに追加のプロセスを実行します。元のプロセスには影響しません。',
                en: '## What is Interactive Mode?\n\nThe `-it` option combines `-i` (interactive) and `-t` (TTY) to open a terminal inside the container.\n\n### Two Approaches\n- **docker run -it**: Create a new container and enter it\n- **docker exec -it**: Enter an already running container\n\n```\n# Create a new container and enter it\ndocker run -it ubuntu bash\n\n# Enter a running container\ndocker exec -it <ID> bash\n```\n\n`exec` runs an additional process in a running container without affecting the main process.',
            },
        },
        simulation: [
            {
                prompt: { ja: 'Ubuntu コンテナを対話モードで起動してみましょう', en: 'Start an Ubuntu container in interactive mode' },
                expectedCommand: 'docker run -it ubuntu bash',
                alternativeCommands: ['docker run -it ubuntu /bin/bash', 'docker run -it ubuntu:latest bash'],
                output: 'root@c4d5e6f7a8b9:/#',
                hint: { ja: 'docker run -it ubuntu bash と入力してみましょう', en: 'Try: docker run -it ubuntu bash' },
                xp: 20,
            },
            {
                prompt: { ja: 'コンテナ内でOSの情報を確認しましょう', en: 'Check the OS info inside the container' },
                expectedCommand: 'cat /etc/os-release',
                output: `PRETTY_NAME="Ubuntu 22.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu`,
                hint: { ja: 'cat /etc/os-release でOS情報が見られます', en: 'Use cat /etc/os-release to see OS info' },
                xp: 20,
            },
            {
                prompt: { ja: '稼働中の nginx コンテナに入ってみましょう（まず nginx を起動してから exec）', en: 'Enter a running nginx container (start nginx first, then exec)' },
                expectedCommand: 'docker exec -it epic_darwin bash',
                alternativeCommands: ['docker exec -it f8a3 bash', 'docker exec -it f8a3b5c7d9e2 bash'],
                output: 'root@f8a3b5c7d9e2:/#',
                hint: { ja: 'docker exec -it <コンテナ名orID> bash で中に入れます', en: 'Use docker exec -it <name or ID> bash' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'Ubuntu コンテナに入り、中でいくつかコマンドを実行してみましょう。exit で抜けられます。',
                en: 'Enter an Ubuntu container and run some commands inside. Use exit to leave.',
            },
            commands: ['docker run -it ubuntu bash', 'cat /etc/os-release', 'ls /', 'exit'],
        },
        checkpoint: [
            {
                question: {
                    ja: '稼働中のコンテナに入るコマンドはどれですか？',
                    en: 'Which command enters a running container?',
                },
                options: [
                    { ja: 'docker run -it <ID> bash', en: 'docker run -it <ID> bash' },
                    { ja: 'docker enter <ID>', en: 'docker enter <ID>' },
                    { ja: 'docker exec -it <ID> bash', en: 'docker exec -it <ID> bash' },
                    { ja: 'docker attach <ID> bash', en: 'docker attach <ID> bash' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'docker exec -it で稼働中のコンテナに追加プロセスとしてシェルを起動し、対話的に操作できます。run は新しいコンテナを作成します。',
                    en: 'docker exec -it starts a shell as an additional process in a running container for interactive access. run creates a new container.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 5
    {
        id: 5,
        slug: 'port-mapping',
        level: 1,
        icon: '🌐',
        title: { ja: 'ポートを開こう', en: 'Open the Ports' },
        intro: {
            overview: {
                ja: 'コンテナ内のサービスを外部からアクセスできるようにする「ポートマッピング」を学びます。Webサーバーをブラウザで表示する方法を実践します。',
                en: 'Learn "port mapping" to make services inside containers accessible from outside. Practice displaying a web server in your browser.',
            },
            why: {
                ja: 'コンテナはデフォルトで隔離されており、外部からアクセスできません。WebアプリやAPIを公開するには、コンテナのポートをホストのポートに接続する必要があります。これが「ポートマッピング」です。',
                en: 'Containers are isolated by default and inaccessible from outside. To expose web apps or APIs, you need to connect container ports to host ports — this is "port mapping."',
            },
            before: { ja: 'コンテナ内のWebサーバーにブラウザからアクセスできない。コンテナは孤立した状態。', en: 'Can\'t access web server inside container from browser. Container is isolated.' },
            after: { ja: '-p オプションでポートを公開。http://localhost で即座にアクセス可能。', en: 'Expose ports with -p option. Instantly accessible at http://localhost.' },
        },
        goals: [
            { ja: 'ポートマッピングの仕組みを理解する', en: 'Understand how port mapping works' },
            { ja: '-p オプションでポートを公開できる', en: 'Expose ports with the -p option' },
            { ja: 'ブラウザからコンテナ内のWebサーバーにアクセスできる', en: 'Access a web server inside a container from a browser' },
        ],
        concept: {
            content: {
                ja: '## ポートマッピングの仕組み\n\nコンテナは独自のネットワークを持っています。外部からアクセスするには、ホストのポートとコンテナのポートを繋ぎます。\n\n```\nホスト (あなたのPC)          コンテナ\n┌──────────────┐      ┌──────────────┐\n│ :8080 ───────┼──→───┼─── :80       │\n│              │      │  (nginx)     │\n└──────────────┘      └──────────────┘\n\nブラウザ → http://localhost:8080 → コンテナの80番ポート\n```\n\n### 構文\n`docker run -p <ホスト側ポート>:<コンテナ側ポート>`\n\n例: `docker run -p 8080:80 nginx`\n→ ホストの8080番ポートをコンテナの80番ポートに接続',
                en: '## How Port Mapping Works\n\nContainers have their own network. To access from outside, connect host ports to container ports.\n\n```\nHost (Your PC)               Container\n┌──────────────┐      ┌──────────────┐\n│ :8080 ───────┼──→───┼─── :80       │\n│              │      │  (nginx)     │\n└──────────────┘      └──────────────┘\n\nBrowser → http://localhost:8080 → Container port 80\n```\n\n### Syntax\n`docker run -p <host-port>:<container-port>`\n\nExample: `docker run -p 8080:80 nginx`\n→ Connects host port 8080 to container port 80',
            },
        },
        simulation: [
            {
                prompt: { ja: 'nginx をポート8080で公開してみましょう', en: 'Expose nginx on port 8080' },
                expectedCommand: 'docker run -d -p 8080:80 nginx',
                alternativeCommands: ['docker run -p 8080:80 -d nginx', 'docker run -d -p 8080:80 nginx:latest'],
                output: 'b7c8d9e0f1a2...',
                hint: { ja: '-p 8080:80 でホストの8080をコンテナの80に接続します', en: 'Use -p 8080:80 to map host 8080 to container 80' },
                xp: 20,
            },
            {
                prompt: { ja: 'ポートの割り当てを確認しましょう', en: 'Check the port assignment' },
                expectedCommand: 'docker ps',
                alternativeCommands: ['docker container ls'],
                output: `CONTAINER ID   IMAGE   COMMAND                  CREATED         STATUS         PORTS                  NAMES
b7c8d9e0f1a2   nginx   "/docker-entrypoint.…"   5 seconds ago   Up 4 seconds   0.0.0.0:8080->80/tcp   cool_babbage`,
                hint: { ja: 'docker ps でPORTS列を確認しましょう', en: 'Check the PORTS column with docker ps' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'nginx をポートマッピング付きで起動し、ブラウザで http://localhost:8080 にアクセスしてみましょう！「Welcome to nginx!」が表示されれば成功です。',
                en: 'Start nginx with port mapping and visit http://localhost:8080 in your browser! If you see "Welcome to nginx!" you\'ve succeeded.',
            },
            commands: ['docker run -d -p 8080:80 nginx', 'docker ps'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'docker run -p 3000:80 の意味として正しいものは？',
                    en: 'What does docker run -p 3000:80 mean?',
                },
                options: [
                    { ja: 'コンテナのポート3000をホストのポート80に接続', en: 'Connect container port 3000 to host port 80' },
                    { ja: 'ホストのポート3000をコンテナのポート80に接続', en: 'Connect host port 3000 to container port 80' },
                    { ja: '3000番と80番の両方を開放', en: 'Open both ports 3000 and 80' },
                    { ja: 'ポート3000から80の範囲を開放', en: 'Open port range 3000 to 80' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: '-p はホスト側:コンテナ側の順番です。つまり -p 3000:80 は「ホストの3000番ポートにアクセスするとコンテナの80番ポートに転送される」という意味です。',
                    en: '-p follows the pattern host:container. So -p 3000:80 means "accessing host port 3000 forwards to container port 80."',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 6
    {
        id: 6,
        slug: 'data-persistence',
        level: 1,
        icon: '💾',
        title: { ja: 'データを永続化', en: 'Data Persistence' },
        intro: {
            overview: {
                ja: 'コンテナを削除するとデータも消えます。ボリュームとバインドマウントを使ったデータの永続化方法を学びます。',
                en: 'Data is lost when containers are removed. Learn how to persist data using volumes and bind mounts.',
            },
            why: {
                ja: 'データベースやログなど、コンテナが消えても残したいデータがあります。Dockerのボリューム機能を使えば、コンテナのライフサイクルとデータを分離できます。',
                en: 'Databases, logs, and other data needs to survive container removal. Docker volumes let you separate container lifecycle from data.',
            },
            before: { ja: 'コンテナを削除するとDB、設定ファイル、ログなど全データが消失。', en: 'Removing a container destroys all data: DB, config files, logs.' },
            after: { ja: 'ボリュームでデータを永続化。コンテナを再作成してもデータは安全。', en: 'Persist data with volumes. Data survives container recreation.' },
        },
        goals: [
            { ja: 'コンテナのデータが揮発性であることを理解する', en: 'Understand that container data is ephemeral' },
            { ja: 'ボリュームを作成・使用できる', en: 'Create and use volumes' },
            { ja: 'バインドマウントの使い方を知る', en: 'Know how to use bind mounts' },
        ],
        concept: {
            content: {
                ja: '## なぜデータが消える？\n\nコンテナは**使い捨て**が前提。削除すると中のファイルも全て消えます。\n\n### 2つの永続化方法\n\n| 方法 | 特徴 | 用途 |\n|------|------|------|\n| **ボリューム** | Dockerが管理する領域 | DB、永続データ |\n| **バインドマウント** | ホストのフォルダを直接接続 | 開発中のソースコード |\n\n```\n# ボリュームを使う\ndocker run -v mydata:/app/data nginx\n\n# バインドマウントを使う\ndocker run -v $(pwd):/app nginx\n```',
                en: '## Why Does Data Disappear?\n\nContainers are designed to be **disposable**. When removed, all files inside are gone.\n\n### Two Persistence Methods\n\n| Method | Feature | Use Case |\n|--------|---------|----------|\n| **Volume** | Managed by Docker | DB, persistent data |\n| **Bind Mount** | Directly connects host folder | Source code during dev |\n\n```\n# Using a volume\ndocker run -v mydata:/app/data nginx\n\n# Using a bind mount\ndocker run -v $(pwd):/app nginx\n```',
            },
        },
        simulation: [
            {
                prompt: { ja: 'ボリュームを作成しましょう', en: 'Create a volume' },
                expectedCommand: 'docker volume create mydata',
                output: 'mydata',
                hint: { ja: 'docker volume create <名前> でボリュームを作成', en: 'Use docker volume create <name>' },
                xp: 20,
            },
            {
                prompt: { ja: '作成したボリュームの一覧を確認しましょう', en: 'List the created volumes' },
                expectedCommand: 'docker volume ls',
                output: `DRIVER    VOLUME NAME
local     mydata`,
                hint: { ja: 'docker volume ls でボリューム一覧を表示', en: 'Use docker volume ls to list volumes' },
                xp: 20,
            },
            {
                prompt: { ja: 'ボリュームをマウントしてコンテナを起動しましょう', en: 'Start a container with the volume mounted' },
                expectedCommand: 'docker run -d -v mydata:/usr/share/nginx/html nginx',
                alternativeCommands: ['docker run -d -v mydata:/usr/share/nginx/html nginx:latest'],
                output: 'e9f0a1b2c3d4...',
                hint: { ja: '-v ボリューム名:コンテナ内パス の形式です', en: 'Use -v volume-name:container-path format' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'ボリュームを作成し、それをマウントしたコンテナでファイルを作成。コンテナを削除して再作成しても、データが残っていることを確認しましょう！',
                en: 'Create a volume, mount it in a container, create files. Remove and recreate the container to verify data persists!',
            },
            commands: ['docker volume create mydata', 'docker volume ls', 'docker run -d -v mydata:/usr/share/nginx/html nginx'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'ボリュームとバインドマウントの違いとして正しいものは？',
                    en: 'What is the correct difference between volumes and bind mounts?',
                },
                options: [
                    { ja: '違いはない。同じ機能', en: 'No difference. Same feature' },
                    { ja: 'ボリュームはDockerが管理、バインドマウントはホストのフォルダを直接使用', en: 'Volumes are managed by Docker, bind mounts directly use host folders' },
                    { ja: 'バインドマウントの方が高速', en: 'Bind mounts are faster' },
                    { ja: 'ボリュームは一時的なデータ向け', en: 'Volumes are for temporary data' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'ボリュームはDocker engineが管理する領域で、バインドマウントはホストのファイルシステム上の任意のフォルダをコンテナにマウントします。本番環境ではボリューム、開発時はバインドマウントがよく使われます。',
                    en: 'Volumes are managed by Docker engine, while bind mounts connect any host filesystem folder to the container. Volumes are preferred in production, bind mounts during development.',
                },
            },
        ],
        completionXP: 100,
    },

    // ─────────────────────────────────────────────
    // Level 2: Dockerfile & イメージ
    // ─────────────────────────────────────────────

    // Chapter 7
    {
        id: 7,
        slug: 'write-dockerfile',
        level: 2,
        icon: '📝',
        title: { ja: 'Dockerfileを書こう', en: 'Write a Dockerfile' },
        intro: {
            overview: {
                ja: '自分だけのDockerイメージを作る「Dockerfile」の書き方を学びます。環境構築を自動化する設計図を書けるようになります。',
                en: 'Learn to write a "Dockerfile" to create your own Docker images. Master the blueprint that automates environment setup.',
            },
            why: {
                ja: '手動でコンテナに入ってソフトウェアをインストールするのは非効率で再現性がありません。Dockerfileを書けば、同じ環境を何度でも自動的に構築できます。これが「Infrastructure as Code」の第一歩です。',
                en: 'Manually entering containers to install software is inefficient and not reproducible. With a Dockerfile, you can automatically build the same environment repeatedly. This is the first step of "Infrastructure as Code."',
            },
            before: { ja: '環境構築に毎回数時間。手順書通りにやっても微妙に環境が異なる。', en: 'Hours of setup every time. Environment subtly differs even following docs.' },
            after: { ja: 'Dockerfile一つで一発構築。誰がいつ実行しても同じ環境。', en: 'One Dockerfile, one build. Same environment for anyone, anytime.' },
        },
        goals: [
            { ja: 'Dockerfileの基本命令(FROM, RUN, COPY, CMD)を理解する', en: 'Understand basic Dockerfile instructions (FROM, RUN, COPY, CMD)' },
            { ja: 'DockerfileからDockerイメージをビルドできる', en: 'Build a Docker image from a Dockerfile' },
            { ja: '自作イメージでコンテナを起動できる', en: 'Start a container from a custom image' },
        ],
        concept: {
            content: {
                ja: '## Docker エコシステムの全体像\n\nDockerfileを書く前に、Docker の世界の登場人物と関係を理解しましょう。\n\n![Dockerエコシステム概要](/images/docker-ecosystem.png)\n\n### 5つの登場人物\n\n| 要素 | 役割 | たとえると |\n|------|------|-----------|\n| `Dockerfile` | イメージの設計図（テキストファイル） | 料理のレシピ |\n| `Docker Image` | 実行環境のテンプレート（読み取り専用） | レシピから作った冷凍食品 |\n| `Container` | イメージから起動した実行中の環境 | 冷凍食品を解凍して食べている状態 |\n| `Host` | Dockerが動いているあなたのPC | あなたのキッチン |\n| `Docker Hub` | イメージを共有するクラウドレジストリ | レシピと冷凍食品の共有サイト |\n\n### 基本の流れ\n- `docker build` : Dockerfile → **Image を作成**\n- `docker run` : Image → **Container を起動**\n- `docker push` : Image → **Docker Hub にアップロード**\n- `docker pull` : Docker Hub → **Image をダウンロード**\n\n---\n\n## Dockerfileとは？\n\nDockerイメージを自動的に構築するための**設計図（テキストファイル）**です。\n\n### 基本命令\n\n| 命令 | 役割 | 例 |\n|------|------|----|\n| `FROM` | ベースイメージを指定 | `FROM node:18` |\n| `RUN` | コマンドを実行 | `RUN npm install` |\n| `COPY` | ファイルをコピー | `COPY . /app` |\n| `WORKDIR` | 作業ディレクトリ設定 | `WORKDIR /app` |\n| `CMD` | コンテナ起動時のコマンド | `CMD ["node", "app.js"]` |\n\n### Dockerfile の例\n```\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]\n```',
                en: '## Docker Ecosystem Overview\n\nBefore writing a Dockerfile, let\'s understand the key players in the Docker world and how they relate.\n\n![Docker Ecosystem Overview](/images/docker-ecosystem.png)\n\n### The 5 Key Players\n\n| Element | Role | Analogy |\n|---------|------|---------|\n| `Dockerfile` | Blueprint for images (text file) | A cooking recipe |\n| `Docker Image` | Read-only template for environments | Frozen meal made from recipe |\n| `Container` | Running instance created from image | Frozen meal being eaten |\n| `Host` | Your PC where Docker runs | Your kitchen |\n| `Docker Hub` | Cloud registry for sharing images | Recipe & frozen meal sharing site |\n\n### The Basic Flow\n- `docker build` : Dockerfile → **Creates an Image**\n- `docker run` : Image → **Starts a Container**\n- `docker push` : Image → **Uploads to Docker Hub**\n- `docker pull` : Docker Hub → **Downloads an Image**\n\n---\n\n## What is a Dockerfile?\n\nA **blueprint (text file)** that automatically builds Docker images.\n\n### Basic Instructions\n\n| Instruction | Role | Example |\n|-------------|------|---------|\n| `FROM` | Specify base image | `FROM node:18` |\n| `RUN` | Execute command | `RUN npm install` |\n| `COPY` | Copy files | `COPY . /app` |\n| `WORKDIR` | Set working directory | `WORKDIR /app` |\n| `CMD` | Command to run on start | `CMD ["node", "app.js"]` |\n\n### Dockerfile Example\n```\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]\n```',
            },
        },
        simulation: [
            {
                prompt: { ja: 'Dockerfileからイメージをビルドしましょう。myapp という名前でタグ付けします。', en: 'Build an image from a Dockerfile. Tag it as myapp.' },
                expectedCommand: 'docker build -t myapp .',
                alternativeCommands: ['docker build -t myapp:latest .'],
                output: `[+] Building 12.3s (9/9) FINISHED
 => [1/5] FROM node:18-alpine
 => [2/5] WORKDIR /app
 => [3/5] COPY package.json .
 => [4/5] RUN npm install
 => [5/5] COPY . .
 => exporting to image
 => => naming to docker.io/library/myapp:latest`,
                hint: { ja: 'docker build -t <名前> . でカレントディレクトリのDockerfileをビルド', en: 'Use docker build -t <name> . to build from current directory' },
                xp: 20,
            },
            {
                prompt: { ja: 'ビルドしたイメージの一覧を確認しましょう', en: 'List the built images' },
                expectedCommand: 'docker images',
                alternativeCommands: ['docker image ls'],
                output: `REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
myapp        latest    a1b2c3d4e5f6   10 seconds ago   180MB
node         18-alpine 9876543210ab   2 days ago        170MB
nginx        latest    1234567890cd   5 days ago        187MB`,
                hint: { ja: 'docker images でイメージ一覧を表示', en: 'Use docker images to list images' },
                xp: 20,
            },
            {
                prompt: { ja: '自作イメージからコンテナを起動しましょう', en: 'Start a container from your custom image' },
                expectedCommand: 'docker run -d -p 3000:3000 myapp',
                alternativeCommands: ['docker run -p 3000:3000 -d myapp', 'docker run -d -p 3000:3000 myapp:latest'],
                output: 'c3d4e5f6a7b8...',
                hint: { ja: 'docker run -d -p 3000:3000 myapp で起動', en: 'Use docker run -d -p 3000:3000 myapp' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '簡単なNode.jsアプリ用のDockerfileを作成し、ビルド・実行してみましょう。まずは Dockerfile を作成することから始めます。',
                en: 'Create a Dockerfile for a simple Node.js app, then build and run it. Start by creating the Dockerfile.',
            },
            commands: ['docker build -t myapp .', 'docker images', 'docker run -d -p 3000:3000 myapp'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Dockerfileの FROM 命令の役割は？',
                    en: 'What is the role of the FROM instruction in a Dockerfile?',
                },
                options: [
                    { ja: 'ファイルをコピーする', en: 'Copy files' },
                    { ja: 'ベースとなるイメージを指定する', en: 'Specify the base image' },
                    { ja: 'コンテナの起動コマンドを設定する', en: 'Set the container start command' },
                    { ja: '環境変数を設定する', en: 'Set environment variables' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'FROM はDockerfileの最初に記述し、ベースとなるイメージを指定します。すべてのDockerfileは FROM から始まります。',
                    en: 'FROM is written first in a Dockerfile and specifies the base image. Every Dockerfile must start with FROM.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 8
    {
        id: 8,
        slug: 'image-layers',
        level: 2,
        icon: '📚',
        title: { ja: 'レイヤーを理解する', en: 'Understanding Layers' },
        intro: {
            overview: {
                ja: 'Dockerイメージのレイヤー構造とビルドキャッシュの仕組みを学びます。効率的なイメージ設計の鍵を理解します。',
                en: 'Learn Docker image layer structure and build cache mechanics. Understand the key to efficient image design.',
            },
            why: {
                ja: 'なぜ同じビルドが2回目は速いのか？なぜDockerfileの命令の順番が大事なのか？レイヤーキャッシュの仕組みを理解すれば、ビルド時間を大幅に短縮できます。',
                en: 'Why is the second build faster? Why does instruction order matter? Understanding layer caching lets you dramatically reduce build times.',
            },
            before: { ja: '毎回フルビルドで数分〜数十分。Dockerfileの変更が全体の再ビルドを引き起こす。', en: 'Full rebuild taking minutes every time. Any Dockerfile change triggers complete rebuild.' },
            after: { ja: 'レイヤーキャッシュで変更箇所のみ再ビルド。数秒で完了。', en: 'Layer caching rebuilds only changed parts. Done in seconds.' },
        },
        goals: [
            { ja: 'レイヤーの仕組みを理解する', en: 'Understand the layer system' },
            { ja: 'ビルドキャッシュを活用できる', en: 'Leverage build cache effectively' },
            { ja: '.dockerignore を使える', en: 'Use .dockerignore' },
        ],
        concept: {
            content: {
                ja: '## レイヤー構造\n\nDockerfileの各命令（FROM, RUN, COPY等）が**1つのレイヤー**を作ります。\n\n```\n┌─────────────────┐ ← CMD（実行時設定のみ、レイヤーなし）\n├─────────────────┤\n│ COPY . .        │ ← レイヤー4（ソースコード）\n├─────────────────┤\n│ RUN npm install │ ← レイヤー3（依存関係）\n├─────────────────┤\n│ COPY package.json│ ← レイヤー2\n├─────────────────┤\n│ FROM node:18    │ ← レイヤー1（ベースイメージ）\n└─────────────────┘\n```\n\n### キャッシュの法則\n- あるレイヤーが変更されると、**それ以降の全レイヤー**が再ビルド\n- 変更が少ないものを**先に**、変更が多いものを**後に**書く\n\n### .dockerignore\n`node_modules/` や `.git/` など不要なファイルを除外し、ビルドを高速化します。',
                en: '## Layer Structure\n\nEach Dockerfile instruction (FROM, RUN, COPY, etc.) creates **one layer**.\n\n```\n┌─────────────────┐ ← CMD (runtime config, no layer)\n├─────────────────┤\n│ COPY . .        │ ← Layer 4 (source code)\n├─────────────────┤\n│ RUN npm install │ ← Layer 3 (dependencies)\n├─────────────────┤\n│ COPY package.json│ ← Layer 2\n├─────────────────┤\n│ FROM node:18    │ ← Layer 1 (base image)\n└─────────────────┘\n```\n\n### Cache Rules\n- When a layer changes, **all subsequent layers** are rebuilt\n- Put **less frequently changed** items first, **more frequently changed** last\n\n### .dockerignore\nExclude files like `node_modules/` and `.git/` to speed up builds.',
            },
        },
        simulation: [
            {
                prompt: { ja: 'イメージのレイヤー履歴を確認しましょう', en: 'Check the image layer history' },
                expectedCommand: 'docker history myapp',
                alternativeCommands: ['docker history myapp:latest', 'docker image history myapp'],
                output: `IMAGE          CREATED         CREATED BY                                      SIZE
a1b2c3d4e5f6   2 minutes ago   CMD ["node" "app.js"]                           0B
<missing>      2 minutes ago   COPY . .                                        15.2kB
<missing>      2 minutes ago   RUN npm install                                 10.5MB
<missing>      2 minutes ago   COPY package.json .                             285B
<missing>      2 minutes ago   WORKDIR /app                                    0B
<missing>      3 days ago      FROM node:18-alpine                             170MB`,
                hint: { ja: 'docker history <イメージ名> でレイヤーを確認', en: 'Use docker history <image> to see layers' },
                xp: 20,
            },
            {
                prompt: { ja: '再びビルドしてキャッシュの効果を確認しましょう', en: 'Build again to see cache in action' },
                expectedCommand: 'docker build -t myapp .',
                alternativeCommands: ['docker build -t myapp:latest .'],
                output: `[+] Building 0.5s (9/9) FINISHED
 => CACHED [1/5] FROM node:18-alpine
 => CACHED [2/5] WORKDIR /app
 => CACHED [3/5] COPY package.json .
 => CACHED [4/5] RUN npm install
 => CACHED [5/5] COPY . .
 => exporting to image`,
                hint: { ja: '同じ docker build コマンドをもう一度実行してみましょう', en: 'Run the same docker build command again' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '前章で作ったDockerfileを2回ビルドし、2回目がキャッシュで高速化されることを確認しましょう。docker history でレイヤーも確認してみてください。',
                en: 'Build your Dockerfile twice and verify the second build is faster with cache. Check layers with docker history.',
            },
            commands: ['docker build -t myapp .', 'docker build -t myapp .', 'docker history myapp'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Dockerfileでレイヤーキャッシュを最大限活用するには？',
                    en: 'How to maximize layer cache usage in Dockerfile?',
                },
                options: [
                    { ja: '全ての命令を1つのRUNにまとめる', en: 'Combine all instructions into one RUN' },
                    { ja: '変更が少ないものを先に、変更が多いものを後に書く', en: 'Put less frequently changed items first, more frequently changed last' },
                    { ja: 'FROMを最後に書く', en: 'Put FROM at the end' },
                    { ja: 'キャッシュは自動で最適化される', en: 'Cache is automatically optimized' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'レイヤーが変更されるとそれ以降の全レイヤーが再ビルドされます。頻繁に変わるソースコード(COPY . .)は最後に、変わりにくい依存関係(RUN npm install)は先に書くのがベストプラクティスです。',
                    en: 'When a layer changes, all subsequent layers are rebuilt. Frequently changing source code (COPY . .) should be last, while stable dependencies (RUN npm install) should come first.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 9
    {
        id: 9,
        slug: 'multi-stage-build',
        level: 2,
        icon: '🏗️',
        title: { ja: 'マルチステージビルド', en: 'Multi-Stage Builds' },
        intro: {
            overview: {
                ja: '本番用の軽量イメージを作る「マルチステージビルド」を学びます。ビルド環境と実行環境を分離し、イメージサイズを劇的に削減します。',
                en: 'Learn "multi-stage builds" to create lightweight production images. Separate build and runtime environments to dramatically reduce image size.',
            },
            why: {
                ja: '開発時にはコンパイラや開発ツールが必要ですが、本番環境には不要です。マルチステージビルドを使えば、ビルドに必要なツールを最終イメージに含めずに済み、セキュリティとパフォーマンスが向上します。',
                en: 'Development needs compilers and dev tools, but production doesn\'t. Multi-stage builds exclude build tools from the final image, improving security and performance.',
            },
            before: { ja: '本番イメージにビルドツールが含まれ、サイズが数百MB〜数GB。セキュリティリスクも増加。', en: 'Production image includes build tools, size reaches hundreds of MB to GB. Increased security risk.' },
            after: { ja: 'マルチステージビルドで実行に必要なもののみ含む軽量イメージ。数十MBに圧縮。', en: 'Multi-stage build creates lean images with only runtime needs. Compressed to tens of MB.' },
        },
        goals: [
            { ja: 'マルチステージビルドの概念を理解する', en: 'Understand multi-stage build concept' },
            { ja: '2段階のDockerfileを書ける', en: 'Write a two-stage Dockerfile' },
            { ja: 'イメージサイズの違いを比較できる', en: 'Compare image size differences' },
        ],
        concept: {
            content: {
                ja: '## マルチステージビルドとは？\n\n1つのDockerfileに複数の `FROM` を書き、ビルド段階と実行段階を分離します。\n\n```\n# ステージ1: ビルド用\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# ステージ2: 実行用（軽量）\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCMD ["node", "dist/index.js"]\n```\n\n### 効果\n| | シングルステージ | マルチステージ |\n|---|---|---|\n| イメージサイズ | 1.2GB | 180MB |\n| ビルドツール | 含まれる | 含まれない |\n| セキュリティ | 攻撃面が広い | 最小限 |',
                en: '## What is Multi-Stage Build?\n\nWrite multiple `FROM` in one Dockerfile to separate build and runtime stages.\n\n```\n# Stage 1: Build\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# Stage 2: Runtime (lightweight)\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCMD ["node", "dist/index.js"]\n```\n\n### Impact\n| | Single-Stage | Multi-Stage |\n|---|---|---|\n| Image Size | 1.2GB | 180MB |\n| Build Tools | Included | Excluded |\n| Security | Larger attack surface | Minimal |',
            },
        },
        simulation: [
            {
                prompt: { ja: 'マルチステージビルドでイメージを作りましょう', en: 'Build an image with multi-stage build' },
                expectedCommand: 'docker build -t myapp:optimized .',
                alternativeCommands: ['docker build -t myapp:optimized -f Dockerfile .'],
                output: `[+] Building 18.5s (12/12) FINISHED
 => [builder 1/4] FROM node:18
 => [builder 2/4] WORKDIR /app
 => [builder 3/4] COPY . .
 => [builder 4/4] RUN npm install && npm run build
 => [stage-1 1/3] FROM node:18-alpine
 => [stage-1 2/3] WORKDIR /app
 => [stage-1 3/3] COPY --from=builder /app/dist ./dist
 => exporting to image
 => => naming to docker.io/library/myapp:optimized`,
                hint: { ja: ':optimized タグを付けてビルドしましょう', en: 'Build with the :optimized tag' },
                xp: 20,
            },
            {
                prompt: { ja: 'イメージサイズを比較しましょう', en: 'Compare image sizes' },
                expectedCommand: 'docker images myapp',
                alternativeCommands: ['docker image ls myapp'],
                output: `REPOSITORY   TAG         IMAGE ID       CREATED          SIZE
myapp        optimized   b2c3d4e5f6a7   5 seconds ago    85MB
myapp        latest      a1b2c3d4e5f6   10 minutes ago   1.2GB`,
                hint: { ja: 'docker images myapp で myapp のイメージ一覧を表示', en: 'Use docker images myapp to list myapp images' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'マルチステージビルド用のDockerfileを作成し、通常ビルドとサイズを比較してみましょう。docker images でサイズの違いを確認できます。',
                en: 'Create a multi-stage Dockerfile and compare sizes with a regular build. Check size differences with docker images.',
            },
            commands: ['docker build -t myapp .', 'docker build -t myapp:optimized -f Dockerfile.multi .', 'docker images myapp'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'マルチステージビルドの最大のメリットは？',
                    en: 'What is the biggest advantage of multi-stage builds?',
                },
                options: [
                    { ja: 'ビルドが速くなる', en: 'Faster builds' },
                    { ja: 'Dockerfileが短くなる', en: 'Shorter Dockerfile' },
                    { ja: 'ビルドツールを含まない軽量な本番イメージを作れる', en: 'Create lightweight production images without build tools' },
                    { ja: 'キャッシュが効きやすくなる', en: 'Better cache utilization' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'マルチステージビルドの最大のメリットは、ビルドに必要なツール（コンパイラ等）を最終イメージに含めず、実行に必要なファイルのみの軽量イメージを作れることです。',
                    en: 'The biggest advantage is creating lightweight images with only runtime files, excluding build tools like compilers from the final image.',
                },
            },
        ],
        completionXP: 100,
    },

    // ─────────────────────────────────────────────
    // Level 3: Docker Compose 入門
    // ─────────────────────────────────────────────

    // Chapter 10
    {
        id: 10,
        slug: 'compose-intro',
        level: 3,
        icon: '🎼',
        title: { ja: 'Composeの世界へ', en: 'Enter the Compose World' },
        intro: {
            overview: {
                ja: '複数のコンテナをまとめて管理する Docker Compose の基本を学びます。YAML形式の設定ファイルでサービスを定義する方法を実践します。',
                en: 'Learn Docker Compose basics for managing multiple containers together. Practice defining services in YAML configuration files.',
            },
            why: {
                ja: '実際のWebアプリケーションは、Webサーバー・データベース・キャッシュなど複数のコンテナで構成されます。これらを毎回 docker run で個別に起動するのは非効率。Compose なら docker-compose.yml 一つで全て管理できます。',
                en: 'Real web apps consist of multiple containers: web server, database, cache, etc. Starting each with docker run is inefficient. Compose lets you manage everything in one docker-compose.yml.',
            },
            before: { ja: '複数コンテナを個別に docker run。起動順やネットワーク設定を毎回手動管理。', en: 'Running docker run for each container. Manually managing startup order and networking.' },
            after: { ja: 'docker compose up 一発で全サービス起動。設定はYAMLファイルで管理。', en: 'One docker compose up starts all services. Configuration managed in YAML.' },
        },
        goals: [
            { ja: 'Docker Compose の役割を理解する', en: 'Understand the role of Docker Compose' },
            { ja: 'docker-compose.yml の基本構造を書ける', en: 'Write basic docker-compose.yml structure' },
            { ja: 'docker compose up/down を使える', en: 'Use docker compose up/down' },
        ],
        concept: {
            content: {
                ja: '## Docker Compose とは？\n\n複数のコンテナを**1つの設定ファイル**で定義・管理するツールです。\n\n### docker-compose.yml の基本\n```\nversion: "3.8"\nservices:\n  web:\n    image: nginx\n    ports:\n      - "8080:80"\n  db:\n    image: postgres\n    environment:\n      POSTGRES_PASSWORD: secret\n```\n\n### 基本コマンド\n- `docker compose up` : サービスを起動\n- `docker compose up -d` : バックグラウンドで起動\n- `docker compose down` : サービスを停止・削除\n- `docker compose ps` : サービスの状態を確認\n- `docker compose logs` : ログを確認',
                en: '## What is Docker Compose?\n\nA tool to define and manage multiple containers in **one configuration file**.\n\n### docker-compose.yml Basics\n```\nversion: "3.8"\nservices:\n  web:\n    image: nginx\n    ports:\n      - "8080:80"\n  db:\n    image: postgres\n    environment:\n      POSTGRES_PASSWORD: secret\n```\n\n### Basic Commands\n- `docker compose up` : Start services\n- `docker compose up -d` : Start in background\n- `docker compose down` : Stop and remove services\n- `docker compose ps` : Check service status\n- `docker compose logs` : View logs',
            },
        },
        simulation: [
            {
                prompt: { ja: 'Compose で全サービスをバックグラウンドで起動しましょう', en: 'Start all services in the background with Compose' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 3/3
 ✔ Network myapp_default  Created
 ✔ Container myapp-db-1   Started
 ✔ Container myapp-web-1  Started`,
                hint: { ja: 'docker compose up -d で全サービスをバックグラウンド起動', en: 'Use docker compose up -d to start in background' },
                xp: 20,
            },
            {
                prompt: { ja: 'サービスの状態を確認しましょう', en: 'Check service status' },
                expectedCommand: 'docker compose ps',
                alternativeCommands: ['docker-compose ps'],
                output: `NAME            IMAGE      COMMAND                  SERVICE   CREATED         STATUS         PORTS
myapp-db-1      postgres   "docker-entrypoint.s…"   db        10 seconds ago  Up 9 seconds   5432/tcp
myapp-web-1     nginx      "/docker-entrypoint.…"   web       10 seconds ago  Up 9 seconds   0.0.0.0:8080->80/tcp`,
                hint: { ja: 'docker compose ps でサービス一覧を確認', en: 'Use docker compose ps to see services' },
                xp: 20,
            },
            {
                prompt: { ja: '全サービスを停止・削除しましょう', en: 'Stop and remove all services' },
                expectedCommand: 'docker compose down',
                alternativeCommands: ['docker-compose down'],
                output: `[+] Running 3/3
 ✔ Container myapp-web-1  Removed
 ✔ Container myapp-db-1   Removed
 ✔ Network myapp_default  Removed`,
                hint: { ja: 'docker compose down で全サービスを停止・削除', en: 'Use docker compose down to stop and remove' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '簡単な docker-compose.yml を作成し、nginx と postgres を同時に起動してみましょう。docker compose up -d で起動し、docker compose ps で確認します。',
                en: 'Create a simple docker-compose.yml with nginx and postgres. Start with docker compose up -d and verify with docker compose ps.',
            },
            commands: ['docker compose up -d', 'docker compose ps', 'docker compose logs', 'docker compose down'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Docker Compose の主な目的は？',
                    en: 'What is the main purpose of Docker Compose?',
                },
                options: [
                    { ja: 'Dockerイメージを高速にビルドする', en: 'Build Docker images faster' },
                    { ja: '複数のコンテナを1つの設定ファイルで管理する', en: 'Manage multiple containers with one configuration file' },
                    { ja: 'コンテナを自動削除する', en: 'Automatically remove containers' },
                    { ja: 'Dockerfileを自動生成する', en: 'Auto-generate Dockerfiles' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'Docker Composeは docker-compose.yml ファイルで複数のコンテナ（サービス）を定義し、まとめて起動・停止・管理するツールです。',
                    en: 'Docker Compose uses docker-compose.yml to define multiple containers (services) and manage them together — starting, stopping, and configuring as a unit.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 11
    {
        id: 11,
        slug: 'multi-service',
        level: 3,
        icon: '🔗',
        title: { ja: '複数サービスを連携', en: 'Connect Multiple Services' },
        intro: {
            overview: {
                ja: 'Web + DB のマルチサービス構成を実践します。サービス間通信と depends_on による起動順制御を学びます。',
                en: 'Practice a Web + DB multi-service setup. Learn inter-service communication and startup order control with depends_on.',
            },
            why: {
                ja: 'WebアプリとDBをなぜ別コンテナにするのか？マイクロサービス的な発想で、各サービスを独立させることで、スケーリングや更新が容易になります。Composeのネットワーク機能で、サービス名でお互いにアクセスできます。',
                en: 'Why separate web app and DB into different containers? This microservice approach makes scaling and updates easier. Compose networking lets services access each other by service name.',
            },
            before: { ja: 'アプリとDBを同じサーバーに同居。スケーリングや独立した更新が困難。', en: 'App and DB on same server. Hard to scale or update independently.' },
            after: { ja: 'サービスごとに独立。Composeのネットワークでシンプルに連携。', en: 'Each service is independent. Simple connection through Compose networking.' },
        },
        goals: [
            { ja: 'サービス間の通信の仕組みを理解する', en: 'Understand inter-service communication' },
            { ja: 'depends_on で起動順序を制御できる', en: 'Control startup order with depends_on' },
            { ja: 'Web + DB 構成を構築できる', en: 'Build a Web + DB configuration' },
        ],
        concept: {
            content: {
                ja: '## サービス間通信\n\nDocker Compose は自動的にネットワークを作成し、**サービス名でアクセス**できます。\n\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/mydb\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: mydb\n\nvolumes:\n  pgdata:\n```\n\n### ポイント\n- `db:5432` — サービス名「db」でアクセス（IPアドレス不要）\n- `depends_on` — db が起動してから web を起動\n- `volumes` — DBデータを永続化',
                en: '## Inter-Service Communication\n\nDocker Compose automatically creates a network and services can **access each other by service name**.\n\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/mydb\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: mydb\n\nvolumes:\n  pgdata:\n```\n\n### Key Points\n- `db:5432` — Access by service name "db" (no IP needed)\n- `depends_on` — Start db before web\n- `volumes` — Persist DB data',
            },
        },
        simulation: [
            {
                prompt: { ja: 'Web + DB 構成を起動しましょう', en: 'Start the Web + DB configuration' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 4/4
 ✔ Network webapp_default    Created
 ✔ Volume "webapp_pgdata"    Created
 ✔ Container webapp-db-1     Started
 ✔ Container webapp-web-1    Started`,
                hint: { ja: 'docker compose up -d で起動', en: 'Use docker compose up -d' },
                xp: 20,
            },
            {
                prompt: { ja: 'ログを確認してサービスの起動状況を見ましょう', en: 'Check logs to see service startup status' },
                expectedCommand: 'docker compose logs',
                alternativeCommands: ['docker-compose logs', 'docker compose logs --tail=20'],
                output: `webapp-db-1   | PostgreSQL init process complete; ready for start up.
webapp-db-1   | LOG:  database system is ready to accept connections
webapp-web-1  | Connected to database successfully
webapp-web-1  | Server running on port 3000`,
                hint: { ja: 'docker compose logs でサービスのログを確認', en: 'Use docker compose logs to see service logs' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'docker-compose.yml に web と db サービスを定義し、起動してみましょう。docker compose logs で db が先に起動し、web が接続する様子を確認できます。',
                en: 'Define web and db services in docker-compose.yml and start them. Use docker compose logs to see db starting first and web connecting.',
            },
            commands: ['docker compose up -d', 'docker compose logs', 'docker compose ps', 'docker compose down'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Compose でサービス間通信する際、接続先のホスト名は？',
                    en: 'What hostname is used for inter-service communication in Compose?',
                },
                options: [
                    { ja: 'localhost', en: 'localhost' },
                    { ja: 'コンテナのIPアドレス', en: 'Container IP address' },
                    { ja: 'docker-compose.yml で定義したサービス名', en: 'Service name defined in docker-compose.yml' },
                    { ja: 'ホストマシンのIPアドレス', en: 'Host machine IP address' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'Docker Compose は自動的にネットワークを作成し、サービス名をDNS名として使えます。例えば db サービスには db:5432 でアクセスできます。',
                    en: 'Docker Compose automatically creates a network and uses service names as DNS names. For example, the db service is accessible at db:5432.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 12
    {
        id: 12,
        slug: 'environment-config',
        level: 3,
        icon: '⚙️',
        title: { ja: '環境変数と設定', en: 'Environment Variables & Config' },
        intro: {
            overview: {
                ja: '環境変数を使った設定管理を学びます。.envファイルやenvironment設定で、開発・本番環境を柔軟に切り替えます。',
                en: 'Learn configuration management with environment variables. Use .env files and environment settings to flexibly switch between development and production.',
            },
            why: {
                ja: 'パスワードやAPI キーをコードにハードコードするのはセキュリティリスクです。環境変数で設定を外部化すれば、同じコードで開発・ステージング・本番の異なる設定を使えます。「12-Factor App」の原則です。',
                en: 'Hardcoding passwords and API keys is a security risk. Externalizing config with environment variables lets you use different settings for dev/staging/production with the same code. This is a "12-Factor App" principle.',
            },
            before: { ja: '設定がコードにハードコード。環境ごとにコードを変更する必要あり。秘密情報が漏洩するリスク。', en: 'Config hardcoded in source. Code changes needed per environment. Risk of secret leaks.' },
            after: { ja: '環境変数で設定を外部化。同じコードで環境ごとの設定を切替。秘密情報は安全に管理。', en: 'Externalize config with env vars. Same code, different settings per environment. Secrets managed safely.' },
        },
        goals: [
            { ja: '環境変数の仕組みを理解する', en: 'Understand environment variables' },
            { ja: '.env ファイルで設定を管理できる', en: 'Manage settings with .env files' },
            { ja: '開発/本番の設定切替ができる', en: 'Switch configs between dev/production' },
        ],
        concept: {
            content: {
                ja: '## 設定の外部化\n\n### 3つの設定方法\n\n| 方法 | 用途 | 例 |\n|------|------|----|\n| `environment` | YAMLに直接記述 | 開発用の固定値 |\n| `.env` ファイル | 変数をファイル管理 | 共有する設定 |\n| `docker compose --env-file` | 環境別の設定 | 本番用設定 |\n\n### .env ファイル\n```\n# .env\nPOSTGRES_USER=myuser\nPOSTGRES_PASSWORD=secret123\nPOSTGRES_DB=myapp\nAPP_PORT=3000\n```\n\n### docker-compose.yml での使用\n```\nservices:\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_USER: ${POSTGRES_USER}\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}\n      POSTGRES_DB: ${POSTGRES_DB}\n  web:\n    build: .\n    ports:\n      - "${APP_PORT}:3000"\n```\n\n**重要**: `.env` ファイルは `.gitignore` に追加し、Git にコミットしないこと！',
                en: '## Externalizing Config\n\n### Three Configuration Methods\n\n| Method | Use Case | Example |\n|--------|----------|---------|\n| `environment` | Directly in YAML | Fixed dev values |\n| `.env` file | Manage vars in file | Shared settings |\n| `docker compose --env-file` | Per-environment | Production settings |\n\n### .env File\n```\n# .env\nPOSTGRES_USER=myuser\nPOSTGRES_PASSWORD=secret123\nPOSTGRES_DB=myapp\nAPP_PORT=3000\n```\n\n### Using in docker-compose.yml\n```\nservices:\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_USER: ${POSTGRES_USER}\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}\n      POSTGRES_DB: ${POSTGRES_DB}\n  web:\n    build: .\n    ports:\n      - "${APP_PORT}:3000"\n```\n\n**Important**: Add `.env` to `.gitignore` — never commit it to Git!',
            },
        },
        simulation: [
            {
                prompt: { ja: '.env ファイルの内容を確認しましょう', en: 'Check the .env file contents' },
                expectedCommand: 'cat .env',
                alternativeCommands: ['type .env'],
                output: `POSTGRES_USER=myuser
POSTGRES_PASSWORD=secret123
POSTGRES_DB=myapp
APP_PORT=3000`,
                hint: { ja: 'cat .env でファイルの中身を確認', en: 'Use cat .env to see file contents' },
                xp: 20,
            },
            {
                prompt: { ja: '.env を使ってサービスを起動しましょう', en: 'Start services using .env' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 3/3
 ✔ Network myapp_default  Created
 ✔ Container myapp-db-1   Started
 ✔ Container myapp-web-1  Started`,
                hint: { ja: 'docker compose up -d で.envの変数が自動読み込みされます', en: '.env variables are auto-loaded with docker compose up -d' },
                xp: 20,
            },
            {
                prompt: { ja: 'コンテナの環境変数が正しく設定されているか確認しましょう', en: 'Verify environment variables are set correctly' },
                expectedCommand: 'docker compose exec db env',
                alternativeCommands: ['docker-compose exec db env', 'docker compose exec db printenv'],
                output: `POSTGRES_USER=myuser
POSTGRES_PASSWORD=secret123
POSTGRES_DB=myapp
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PGDATA=/var/lib/postgresql/data`,
                hint: { ja: 'docker compose exec <サービス> env で環境変数を確認', en: 'Use docker compose exec <service> env to check variables' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '.env ファイルを作成し、docker-compose.yml で ${変数名} として参照してみましょう。docker compose exec で環境変数が正しく渡されていることを確認します。',
                en: 'Create a .env file and reference variables with ${VAR_NAME} in docker-compose.yml. Verify with docker compose exec that variables are set correctly.',
            },
            commands: ['cat .env', 'docker compose up -d', 'docker compose exec db env', 'docker compose down'],
        },
        checkpoint: [
            {
                question: {
                    ja: '.env ファイルについて正しいものは？',
                    en: 'Which is correct about .env files?',
                },
                options: [
                    { ja: '.env ファイルは必ずGitにコミットすべき', en: '.env files should always be committed to Git' },
                    { ja: '.env ファイルは Docker Compose が自動で読み込む', en: '.env files are automatically loaded by Docker Compose' },
                    { ja: '.env ファイルは docker-compose.yml より優先される', en: '.env files take priority over docker-compose.yml' },
                    { ja: '.env ファイルは1つしか使えない', en: 'Only one .env file can be used' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'Docker Compose はプロジェクトディレクトリの .env ファイルを自動的に読み込み、docker-compose.yml 内の ${変数名} を展開します。セキュリティのため .env は .gitignore に追加しましょう。',
                    en: 'Docker Compose automatically loads the .env file from the project directory and expands ${VAR_NAME} in docker-compose.yml. For security, add .env to .gitignore.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 13
    {
        id: 13,
        slug: 'healthcheck-logs',
        level: 3,
        icon: '🩺',
        title: { ja: 'ヘルスチェックとログ', en: 'Health Checks & Logs' },
        intro: {
            overview: {
                ja: 'コンテナの稼働状態を監視する healthcheck と、ログ管理の基本を学びます。障害を早期に検知し、効率的にデバッグするスキルを身につけます。',
                en: 'Learn healthcheck monitoring and log management basics. Gain skills to detect issues early and debug efficiently.',
            },
            why: {
                ja: 'コンテナが「起動している」のと「正常に動いている」のは別の話です。healthcheck を定義しないと、アプリがクラッシュしてもコンテナは Running のまま。ログを適切に管理しないと、問題発生時に原因調査ができません。',
                en: 'A container being "running" and "working properly" are different things. Without healthcheck, a crashed app keeps the container Running. Without proper logging, you cannot investigate issues.',
            },
            before: { ja: 'コンテナが動いているか分からない。問題が起きてもログが散在して調査困難。', en: 'No visibility into container health. Logs scattered, hard to investigate issues.' },
            after: { ja: 'healthcheck で異常を自動検知。docker compose logs で一元的にログ確認。', en: 'Auto-detect issues with healthcheck. Centralized logging with docker compose logs.' },
        },
        goals: [
            { ja: 'healthcheck の仕組みと書き方を理解する', en: 'Understand healthcheck mechanics and syntax' },
            { ja: 'docker compose logs でログを効率的に確認できる', en: 'Efficiently check logs with docker compose logs' },
            { ja: 'コンテナの状態を監視・判断できる', en: 'Monitor and assess container health' },
        ],
        concept: {
            content: {
                ja: '## ヘルスチェック\n\nコンテナ内のアプリが**正常に応答しているか**を定期的に確認する仕組みです。\n\n### docker-compose.yml での定義\n```\nservices:\n  web:\n    image: nginx\n    healthcheck:\n      test: ["CMD", "curl", "-f", "http://localhost"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n      start_period: 10s\n```\n\n### ヘルスステータス\n\n| ステータス | 意味 |\n|-----------|------|\n| `starting` | 起動中（start_period 内） |\n| `healthy` | ヘルスチェック成功 |\n| `unhealthy` | ヘルスチェック失敗（retries 回連続） |\n\n---\n\n## ログ管理\n\n### 基本コマンド\n- `docker compose logs` : 全サービスのログを表示\n- `docker compose logs web` : 特定サービスのログ\n- `docker compose logs -f` : リアルタイムでログを追跡\n- `docker compose logs --tail 50` : 最新50行のみ表示\n- `docker compose logs --since 1h` : 直近1時間のログ',
                en: '## Health Checks\n\nA mechanism to periodically verify that the app inside a container is **responding normally**.\n\n### Definition in docker-compose.yml\n```\nservices:\n  web:\n    image: nginx\n    healthcheck:\n      test: ["CMD", "curl", "-f", "http://localhost"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n      start_period: 10s\n```\n\n### Health Statuses\n\n| Status | Meaning |\n|--------|---------|\n| `starting` | Starting up (within start_period) |\n| `healthy` | Health check passed |\n| `unhealthy` | Health check failed (retries consecutive) |\n\n---\n\n## Log Management\n\n### Basic Commands\n- `docker compose logs` : Show all service logs\n- `docker compose logs web` : Logs for specific service\n- `docker compose logs -f` : Follow logs in real-time\n- `docker compose logs --tail 50` : Show last 50 lines\n- `docker compose logs --since 1h` : Logs from last hour',
            },
        },
        simulation: [
            {
                prompt: { ja: 'サービスのヘルス状態を確認しましょう', en: 'Check the health status of services' },
                expectedCommand: 'docker compose ps',
                alternativeCommands: ['docker-compose ps'],
                output: `NAME           SERVICE   STATUS                    PORTS
myapp-web-1    web       Up 2 minutes (healthy)    0.0.0.0:8080->80/tcp
myapp-db-1     db        Up 2 minutes (healthy)    5432/tcp`,
                hint: { ja: 'docker compose ps でステータスとヘルス状態を確認', en: 'Use docker compose ps to check status and health' },
                xp: 20,
            },
            {
                prompt: { ja: 'web サービスのログをリアルタイムで追跡しましょう', en: 'Follow the web service logs in real-time' },
                expectedCommand: 'docker compose logs -f web',
                alternativeCommands: ['docker-compose logs -f web'],
                output: `myapp-web-1  | 172.18.0.1 - - [01/Mar/2026:00:00:01 +0000] "GET / HTTP/1.1" 200 615
myapp-web-1  | 172.18.0.1 - - [01/Mar/2026:00:00:02 +0000] "GET /api/health HTTP/1.1" 200 2`,
                hint: { ja: '-f オプションでリアルタイム追跡。サービス名を指定で絞り込み', en: 'Use -f for real-time follow. Specify service name to filter' },
                xp: 20,
            },
            {
                prompt: { ja: '直近30分のログだけを表示しましょう', en: 'Show only logs from the last 30 minutes' },
                expectedCommand: 'docker compose logs --since 30m',
                alternativeCommands: ['docker-compose logs --since 30m'],
                output: `myapp-web-1  | 172.18.0.1 - - [01/Mar/2026:00:30:01 +0000] "GET / HTTP/1.1" 200 615
myapp-db-1   | 2026-03-01 00:30:00.123 UTC [1] LOG:  checkpoint complete`,
                hint: { ja: '--since 30m で直近30分に絞り込み', en: 'Use --since 30m to filter to last 30 minutes' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'docker-compose.yml に healthcheck を追加し、docker compose ps で healthy 状態を確認しましょう。docker compose logs -f でリアルタイムにログを監視してみましょう。',
                en: 'Add healthcheck to docker-compose.yml, verify healthy status with docker compose ps. Monitor logs in real-time with docker compose logs -f.',
            },
            commands: ['docker compose up -d', 'docker compose ps', 'docker compose logs -f web', 'docker compose logs --since 30m'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'healthcheck の retries: 3 は何を意味する？',
                    en: 'What does healthcheck retries: 3 mean?',
                },
                options: [
                    { ja: '3秒ごとにチェックする', en: 'Check every 3 seconds' },
                    { ja: '3回連続失敗で unhealthy とする', en: 'Mark unhealthy after 3 consecutive failures' },
                    { ja: '最大3回までチェックする', en: 'Check a maximum of 3 times' },
                    { ja: '3つのエンドポイントをチェックする', en: 'Check 3 endpoints' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'retries はヘルスチェックが何回連続で失敗したら unhealthy とするかを定義します。3回連続失敗で初めて unhealthy 状態になります。',
                    en: 'retries defines how many consecutive failures trigger the unhealthy state. The container becomes unhealthy only after 3 consecutive failures.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 14
    {
        id: 14,
        slug: 'dev-workflow',
        level: 3,
        icon: '🔄',
        title: { ja: '開発ワークフロー実践', en: 'Development Workflow' },
        intro: {
            overview: {
                ja: 'Docker Compose を使った効率的な開発ワークフローを学びます。ホットリロード、compose.override.yml による環境分離を実践します。',
                en: 'Learn efficient development workflows with Docker Compose. Practice hot-reloading and environment separation with compose.override.yml.',
            },
            why: {
                ja: 'コードを変えるたびに docker build & docker compose up し直すのは非効率です。bind mount を使えばホストのコード変更が即座にコンテナに反映されます。また、開発と本番で異なる設定が必要な場合、compose.override.yml で分離できます。',
                en: 'Rebuilding and restarting containers for every code change is inefficient. Bind mounts reflect host code changes instantly. compose.override.yml separates dev and production configs.',
            },
            before: { ja: 'コード変更のたびにビルド→再起動。開発と本番の設定が混在。', en: 'Build & restart for every change. Dev and production configs mixed.' },
            after: { ja: 'コード変更が即反映。開発と本番の設定を明確に分離。', en: 'Changes reflected instantly. Dev and production configs cleanly separated.' },
        },
        goals: [
            { ja: 'bind mount でホットリロード環境を構築できる', en: 'Set up hot-reload with bind mounts' },
            { ja: 'compose.override.yml で環境別設定を管理できる', en: 'Manage environment configs with compose.override.yml' },
            { ja: '効率的な開発サイクルを実践できる', en: 'Practice an efficient development cycle' },
        ],
        concept: {
            content: {
                ja: '## 開発用ホットリロード\n\nbind mount を使って、ホストのソースコードをコンテナにリアルタイム同期します。\n\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    volumes:\n      - ./src:/app/src    # ソースコードを同期\n      - /app/node_modules # node_modules は除外\n    command: npm run dev  # 開発用コマンド\n```\n\n---\n\n## 環境別設定の分離\n\n### ファイル構成\n- `compose.yml` : 共通設定（ベース）\n- `compose.override.yml` : 開発用の追加設定（自動読み込み）\n- `compose.prod.yml` : 本番用設定\n\n### compose.yml（共通）\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:15\n```\n\n### compose.override.yml（開発用・自動読み込み）\n```\nservices:\n  web:\n    volumes:\n      - ./src:/app/src\n    command: npm run dev\n    environment:\n      - DEBUG=true\n```\n\n### 本番起動時\n- `docker compose up` → compose.yml + compose.override.yml（開発）\n- `docker compose -f compose.yml -f compose.prod.yml up` → 本番',
                en: '## Hot-Reload for Development\n\nUse bind mounts to sync host source code to containers in real-time.\n\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    volumes:\n      - ./src:/app/src    # Sync source code\n      - /app/node_modules # Exclude node_modules\n    command: npm run dev  # Dev command\n```\n\n---\n\n## Separating Environment Configs\n\n### File Structure\n- `compose.yml` : Base/common config\n- `compose.override.yml` : Dev overrides (auto-loaded)\n- `compose.prod.yml` : Production config\n\n### compose.yml (Base)\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:15\n```\n\n### compose.override.yml (Dev - auto-loaded)\n```\nservices:\n  web:\n    volumes:\n      - ./src:/app/src\n    command: npm run dev\n    environment:\n      - DEBUG=true\n```\n\n### Production Launch\n- `docker compose up` → compose.yml + compose.override.yml (dev)\n- `docker compose -f compose.yml -f compose.prod.yml up` → production',
            },
        },
        simulation: [
            {
                prompt: { ja: 'bind mount 付きで開発サーバーを起動しましょう', en: 'Start the dev server with bind mounts' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 2/2
 ✔ Container myapp-db-1   Started
 ✔ Container myapp-web-1  Started
(compose.override.yml auto-loaded: bind mount + dev mode active)`,
                hint: { ja: 'compose.override.yml は自動読み込みされます', en: 'compose.override.yml is auto-loaded' },
                xp: 20,
            },
            {
                prompt: { ja: '本番用の設定でサービスを起動しましょう', en: 'Start services with production config' },
                expectedCommand: 'docker compose -f compose.yml -f compose.prod.yml up -d',
                alternativeCommands: ['docker-compose -f compose.yml -f compose.prod.yml up -d'],
                output: `[+] Running 2/2
 ✔ Container myapp-db-1   Started
 ✔ Container myapp-web-1  Started
(Production mode: no bind mount, optimized build)`,
                hint: { ja: '-f で使用するファイルを明示指定。override は読み込まれません', en: 'Use -f to specify files explicitly. Override is not loaded' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'compose.yml と compose.override.yml を作成し、開発時は自動的にホットリロードが有効になることを確認しましょう。',
                en: 'Create compose.yml and compose.override.yml, verify that hot-reload is automatically enabled during development.',
            },
            commands: ['docker compose up -d', 'docker compose config', 'docker compose -f compose.yml -f compose.prod.yml config'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'compose.override.yml について正しいものは？',
                    en: 'Which is correct about compose.override.yml?',
                },
                options: [
                    { ja: '手動で -f オプションで指定する必要がある', en: 'Must be specified manually with -f option' },
                    { ja: 'docker compose up 時に自動で読み込まれる', en: 'Automatically loaded on docker compose up' },
                    { ja: '本番環境でのみ使用される', en: 'Used only in production' },
                    { ja: 'compose.yml より先に読み込まれる', en: 'Loaded before compose.yml' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'compose.override.yml は docker compose up 時に自動的に compose.yml とマージされます。開発用の設定（bind mount、デバッグモード等）を書くのに最適です。',
                    en: 'compose.override.yml is automatically merged with compose.yml on docker compose up. It\'s ideal for dev settings like bind mounts and debug mode.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 15
    {
        id: 15,
        slug: 'compose-project',
        level: 3,
        icon: '🏗️',
        title: { ja: 'Compose 実践プロジェクト', en: 'Compose Hands-on Project' },
        intro: {
            overview: {
                ja: 'Web(Node.js) + DB(PostgreSQL) + Cache(Redis) の3サービス構成を一から構築する総合演習です。Level 3 で学んだ知識を統合します。',
                en: 'A comprehensive exercise building a 3-service stack (Node.js + PostgreSQL + Redis) from scratch. Integrates all Level 3 knowledge.',
            },
            why: {
                ja: '個々の機能を学んだだけでは、実際のプロジェクトで組み合わせる時に戸惑います。この演習で healthcheck、volumes、environment、depends_on を全て使った実践的な構成を体験します。',
                en: 'Learning individual features isn\'t enough — combining them in real projects is where challenges arise. This exercise uses healthcheck, volumes, environment, and depends_on together.',
            },
            before: { ja: '個別の機能は分かるが、組み合わせ方が分からない。', en: 'Individual features understood, but combining them is unclear.' },
            after: { ja: '実践的な3サービス構成を自力で構築できる。', en: 'Can build a practical 3-service stack independently.' },
        },
        goals: [
            { ja: 'Web + DB + Cache の3サービス構成を構築できる', en: 'Build a Web + DB + Cache 3-service stack' },
            { ja: '学んだ機能を組み合わせて実践できる', en: 'Combine learned features in practice' },
            { ja: '実務に近いCompose構成を理解する', en: 'Understand production-like Compose configurations' },
        ],
        concept: {
            content: {
                ja: '## 3サービス構成\n\n### アーキテクチャ\n- **web** : Node.js アプリ（ポート3000）\n- **db** : PostgreSQL（データ永続化）\n- **cache** : Redis（セッション・キャッシュ）\n\n### 完成形 docker-compose.yml\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      db:\n        condition: service_healthy\n      cache:\n        condition: service_started\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/myapp\n      REDIS_URL: redis://cache:6379\n\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: myapp\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U user"]\n      interval: 10s\n      retries: 5\n\n  cache:\n    image: redis:7-alpine\n    volumes:\n      - redis-data:/data\n\nvolumes:\n  pgdata:\n  redis-data:\n```\n\n### ポイント\n- `depends_on` + `condition: service_healthy` でDBの準備完了を待つ\n- 各サービスは**サービス名**でアクセス（db:5432, cache:6379）\n- volumes で DB と Cache のデータを永続化',
                en: '## 3-Service Architecture\n\n### Components\n- **web** : Node.js app (port 3000)\n- **db** : PostgreSQL (persistent data)\n- **cache** : Redis (session/cache)\n\n### Complete docker-compose.yml\n```\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      db:\n        condition: service_healthy\n      cache:\n        condition: service_started\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/myapp\n      REDIS_URL: redis://cache:6379\n\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: myapp\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U user"]\n      interval: 10s\n      retries: 5\n\n  cache:\n    image: redis:7-alpine\n    volumes:\n      - redis-data:/data\n\nvolumes:\n  pgdata:\n  redis-data:\n```\n\n### Key Points\n- `depends_on` + `condition: service_healthy` waits for DB readiness\n- Services access each other by **service name** (db:5432, cache:6379)\n- volumes persist DB and Cache data',
            },
        },
        simulation: [
            {
                prompt: { ja: '3サービス構成を起動しましょう', en: 'Start the 3-service stack' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 4/4
 ✔ Network myapp_default    Created
 ✔ Container myapp-cache-1  Started
 ✔ Container myapp-db-1     Started
 ✔ Container myapp-web-1    Started`,
                hint: { ja: 'docker compose up -d で全サービスをバックグラウンド起動', en: 'Use docker compose up -d to start all services in background' },
                xp: 20,
            },
            {
                prompt: { ja: '全サービスの状態を確認しましょう', en: 'Check all service statuses' },
                expectedCommand: 'docker compose ps',
                alternativeCommands: ['docker-compose ps'],
                output: `NAME             SERVICE   STATUS                    PORTS
myapp-cache-1    cache     Up 30 seconds             6379/tcp
myapp-db-1       db        Up 30 seconds (healthy)   5432/tcp
myapp-web-1      web       Up 25 seconds             0.0.0.0:3000->3000/tcp`,
                hint: { ja: 'docker compose ps で各サービスの状態確認', en: 'Use docker compose ps to check each service status' },
                xp: 20,
            },
            {
                prompt: { ja: '全サービスを停止して片付けましょう', en: 'Stop and clean up all services' },
                expectedCommand: 'docker compose down',
                alternativeCommands: ['docker-compose down'],
                output: `[+] Running 4/4
 ✔ Container myapp-web-1    Removed
 ✔ Container myapp-db-1     Removed
 ✔ Container myapp-cache-1  Removed
 ✔ Network myapp_default    Removed`,
                hint: { ja: 'docker compose down で全サービスを停止・削除', en: 'Use docker compose down to stop and remove all services' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'Web + DB + Cache の3サービス構成を docker-compose.yml に定義し、起動してみましょう。各サービスが正しく連携していることを確認します。',
                en: 'Define a Web + DB + Cache 3-service stack in docker-compose.yml and start it. Verify that services communicate correctly.',
            },
            commands: ['docker compose up -d', 'docker compose ps', 'docker compose logs', 'docker compose down'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'depends_on の condition: service_healthy の意味は？',
                    en: 'What does depends_on condition: service_healthy mean?',
                },
                options: [
                    { ja: 'サービスが起動したら次に進む', en: 'Proceed when service starts' },
                    { ja: 'サービスのヘルスチェックが成功したら次に進む', en: 'Proceed when service health check passes' },
                    { ja: 'サービスを3回再起動してから次に進む', en: 'Restart service 3 times then proceed' },
                    { ja: 'サービスのポートが開いたら次に進む', en: 'Proceed when service port is open' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'condition: service_healthy は、依存先のサービスが healthcheck に成功（healthy状態）になるまで、自サービスの起動を待機します。DBの初期化完了を待ってからWebアプリを起動する場合に重要です。',
                    en: 'condition: service_healthy waits until the dependency\'s healthcheck passes (healthy state) before starting your service. Essential for waiting until DB initialization is complete.',
                },
            },
        ],
        completionXP: 100,
    },

    // ─────────────────────────────────────────────
    // Level 4: 実践・運用スキル
    // ─────────────────────────────────────────────

    // Chapter 16
    {
        id: 16,
        slug: 'debug-troubleshoot',
        level: 4,
        icon: '🔍',
        title: { ja: 'デバッグとトラブルシュート', en: 'Debug & Troubleshoot' },
        intro: {
            overview: {
                ja: 'コンテナが動かない時の調査手順と、必須のデバッグコマンドを学びます。docker logs, inspect, stats を使いこなすスキルを獲得します。',
                en: 'Learn investigation procedures and essential debug commands for broken containers. Master docker logs, inspect, and stats.',
            },
            why: {
                ja: '「コンテナが起動しない」「レスポンスが遅い」「メモリが足りない」— こうした問題は日常的に起きます。原因を素早く特定できるデバッグスキルは、Docker を使う上で最も実用的なスキルの一つです。',
                en: '"Container won\'t start", "slow response", "out of memory" — these issues occur daily. Quick debugging skills are among the most practical Docker skills.',
            },
            before: { ja: 'コンテナが動かない時、原因が分からず途方に暮れる。', en: 'Lost when containers don\'t work, unsure how to investigate.' },
            after: { ja: 'ログ→inspect→stats の調査フローで原因を素早く特定。', en: 'Quickly identify issues with logs→inspect→stats investigation flow.' },
        },
        goals: [
            { ja: 'エラー調査の基本フローを理解する', en: 'Understand the basic error investigation flow' },
            { ja: 'docker inspect で詳細情報を確認できる', en: 'Check detailed info with docker inspect' },
            { ja: 'docker stats でリソース使用状況を監視できる', en: 'Monitor resource usage with docker stats' },
        ],
        concept: {
            content: {
                ja: '## デバッグの基本フロー\n\n### Step 1: ログを確認\n```\ndocker logs <コンテナ名>\ndocker logs --tail 50 <コンテナ名>\n```\n\n### Step 2: コンテナの詳細を調査\n```\ndocker inspect <コンテナ名>\n```\n- ネットワーク設定、マウント、環境変数、状態を確認\n\n### Step 3: リソース使用量を確認\n```\ndocker stats\n```\n- CPU、メモリ、ネットワークI/Oをリアルタイム監視\n\n### Step 4: コンテナ内部に入って調査\n```\ndocker exec -it <コンテナ名> sh\n```\n\n---\n\n## よくあるトラブルと対処\n\n| 症状 | 確認コマンド | 原因例 |\n|------|------------|--------|\n| 起動しない | `docker logs` | ポート衝突、設定ミス |\n| レスポンス遅い | `docker stats` | メモリ不足、CPU過負荷 |\n| 接続できない | `docker inspect` | ネットワーク設定ミス |\n| ファイルがない | `docker exec` + `ls` | COPY漏れ、パスミス |',
                en: '## Basic Debug Flow\n\n### Step 1: Check Logs\n```\ndocker logs <container>\ndocker logs --tail 50 <container>\n```\n\n### Step 2: Inspect Container Details\n```\ndocker inspect <container>\n```\n- Check network, mounts, env vars, state\n\n### Step 3: Check Resource Usage\n```\ndocker stats\n```\n- Real-time CPU, memory, network I/O monitoring\n\n### Step 4: Enter Container for Investigation\n```\ndocker exec -it <container> sh\n```\n\n---\n\n## Common Issues & Solutions\n\n| Symptom | Command | Common Cause |\n|---------|---------|-------------|\n| Won\'t start | `docker logs` | Port conflict, config error |\n| Slow response | `docker stats` | Low memory, CPU overload |\n| Can\'t connect | `docker inspect` | Network misconfiguration |\n| Missing files | `docker exec` + `ls` | Missing COPY, wrong path |',
            },
        },
        simulation: [
            {
                prompt: { ja: '起動に失敗したコンテナのログを確認しましょう', en: 'Check logs of a failed container' },
                expectedCommand: 'docker logs myapp-web-1',
                alternativeCommands: ['docker logs myapp_web_1'],
                output: `Error: Cannot find module '/app/server.js'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1075:15)
    at Module._load (node:internal/modules/cjs/loader:920:27)
Node.js v18.19.0`,
                hint: { ja: 'docker logs <コンテナ名> でエラーメッセージを確認', en: 'Use docker logs <container> to check error messages' },
                xp: 20,
            },
            {
                prompt: { ja: 'コンテナのリソース使用状況をリアルタイムで確認しましょう', en: 'Check real-time resource usage' },
                expectedCommand: 'docker stats',
                alternativeCommands: ['docker stats --no-stream'],
                output: `CONTAINER ID   NAME           CPU %   MEM USAGE / LIMIT     MEM %   NET I/O
a1b2c3d4e5f6   myapp-web-1    0.50%   128MiB / 512MiB       25.00%  1.2kB / 648B
f6e5d4c3b2a1   myapp-db-1     1.20%   256MiB / 1GiB         25.00%  3.4kB / 1.2kB`,
                hint: { ja: 'docker stats でCPU・メモリ使用量をリアルタイム監視', en: 'Use docker stats for real-time CPU/memory monitoring' },
                xp: 20,
            },
            {
                prompt: { ja: 'コンテナのネットワーク設定を確認しましょう', en: 'Check container network settings' },
                expectedCommand: 'docker inspect myapp-web-1',
                alternativeCommands: ['docker inspect myapp_web_1'],
                output: `[{
    "NetworkSettings": {
        "Networks": {
            "myapp_default": {
                "IPAddress": "172.18.0.3",
                "Gateway": "172.18.0.1"
            }
        }
    }
}]`,
                hint: { ja: 'docker inspect でコンテナの詳細情報を確認', en: 'Use docker inspect for detailed container info' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: '意図的にエラーを起こし（例：CMD のパスを間違える）、docker logs → docker inspect の調査フローを実践しましょう。',
                en: 'Intentionally create an error (e.g., wrong CMD path), then practice the docker logs → docker inspect investigation flow.',
            },
            commands: ['docker logs <container>', 'docker stats', 'docker inspect <container>', 'docker exec -it <container> sh'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'コンテナが起動しない時、最初に確認すべきコマンドは？',
                    en: 'What command should you check first when a container won\'t start?',
                },
                options: [
                    { ja: 'docker stats', en: 'docker stats' },
                    { ja: 'docker inspect', en: 'docker inspect' },
                    { ja: 'docker logs', en: 'docker logs' },
                    { ja: 'docker exec', en: 'docker exec' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'コンテナが起動しない場合、まず docker logs でエラーメッセージを確認するのが基本です。ほとんどの場合、ログにエラー原因が出力されています。',
                    en: 'When a container won\'t start, check docker logs first. In most cases, the error cause is printed in the logs.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 17
    {
        id: 17,
        slug: 'docker-network',
        level: 4,
        icon: '🌐',
        title: { ja: 'Docker ネットワーク', en: 'Docker Networking' },
        intro: {
            overview: {
                ja: 'これまで暗黙的に使っていた Docker ネットワークの仕組みを明確に理解します。bridge, host, none の違いとカスタムネットワークの活用を学びます。',
                en: 'Explicitly understand Docker networking that you\'ve been using implicitly. Learn bridge, host, none differences and custom network usage.',
            },
            why: {
                ja: 'Compose で「サービス名でアクセスできる」のは、Docker が自動でネットワークを作っているからです。ネットワークの仕組みを理解すれば、マルチプロジェクト間の連携やセキュリティ分離など、より高度な構成が可能になります。',
                en: 'Services accessing each other by name works because Docker auto-creates networks. Understanding networking enables multi-project communication and security isolation.',
            },
            before: { ja: 'ネットワークが「なんとなく動いている」状態。問題が起きると手詰まり。', en: 'Networking "just works" without understanding. Stuck when issues arise.' },
            after: { ja: 'ネットワークの仕組みを理解し、意図した構成を設計できる。', en: 'Understand networking mechanics and design intentional configurations.' },
        },
        goals: [
            { ja: 'bridge / host / none ネットワークの違いを理解する', en: 'Understand bridge / host / none network differences' },
            { ja: 'カスタムネットワークを作成・管理できる', en: 'Create and manage custom networks' },
            { ja: 'ネットワーク分離でセキュリティを向上できる', en: 'Improve security with network isolation' },
        ],
        concept: {
            content: {
                ja: '## ネットワークドライバ\n\n| ドライバ | 用途 | 特徴 |\n|---------|------|------|\n| `bridge` | **デフォルト** | コンテナ間通信可能。最も一般的 |\n| `host` | ホストと同じネットワーク | ポートマッピング不要。パフォーマンス重視 |\n| `none` | ネットワークなし | 完全に隔離。セキュリティ重視 |\n\n### Compose のデフォルト動作\n- `docker compose up` すると `プロジェクト名_default` ネットワークが自動作成\n- 同じ Compose 内のサービスは**サービス名**で互いにアクセス可能\n\n---\n\n## カスタムネットワーク\n\n### なぜ使うか\n- **セキュリティ分離**: フロントエンドとDBを別ネットワークに\n- **マルチプロジェクト**: 異なるプロジェクト間でサービスを共有\n\n```\nservices:\n  web:\n    networks:\n      - frontend\n      - backend\n  db:\n    networks:\n      - backend  # web からのみアクセス可能\n\nnetworks:\n  frontend:\n  backend:\n```',
                en: '## Network Drivers\n\n| Driver | Use Case | Features |\n|--------|----------|----------|\n| `bridge` | **Default** | Inter-container communication. Most common |\n| `host` | Same as host network | No port mapping needed. Performance-focused |\n| `none` | No networking | Fully isolated. Security-focused |\n\n### Compose Default Behavior\n- `docker compose up` auto-creates `projectname_default` network\n- Services in same Compose can access each other by **service name**\n\n---\n\n## Custom Networks\n\n### Why Use Them\n- **Security isolation**: Separate frontend and DB networks\n- **Multi-project**: Share services across different projects\n\n```\nservices:\n  web:\n    networks:\n      - frontend\n      - backend\n  db:\n    networks:\n      - backend  # Only accessible from web\n\nnetworks:\n  frontend:\n  backend:\n```',
            },
        },
        simulation: [
            {
                prompt: { ja: '現在の Docker ネットワーク一覧を確認しましょう', en: 'List current Docker networks' },
                expectedCommand: 'docker network ls',
                alternativeCommands: ['docker network list'],
                output: `NETWORK ID     NAME              DRIVER    SCOPE
a1b2c3d4e5f6   bridge            bridge    local
f6e5d4c3b2a1   host              host      local
1234567890ab   none              null      local
abcdef123456   myapp_default     bridge    local`,
                hint: { ja: 'docker network ls で全ネットワークを一覧表示', en: 'Use docker network ls to list all networks' },
                xp: 20,
            },
            {
                prompt: { ja: 'カスタムネットワークを作成しましょう', en: 'Create a custom network' },
                expectedCommand: 'docker network create mynet',
                alternativeCommands: [],
                output: `9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f`,
                hint: { ja: 'docker network create <名前> でカスタムネットワークを作成', en: 'Use docker network create <name> to create a custom network' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'docker network コマンドでネットワークを作成・確認し、コンテナをカスタムネットワークに接続してみましょう。',
                en: 'Create and inspect networks with docker network commands, then connect containers to custom networks.',
            },
            commands: ['docker network ls', 'docker network create mynet', 'docker network inspect mynet', 'docker network rm mynet'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Docker Compose でサービス名でアクセスできる理由は？',
                    en: 'Why can services access each other by service name in Docker Compose?',
                },
                options: [
                    { ja: '/etc/hosts ファイルに手動で追記するから', en: 'Because /etc/hosts is manually edited' },
                    { ja: 'Compose が自動でネットワークを作り、DNSを提供するから', en: 'Because Compose auto-creates a network with DNS' },
                    { ja: 'すべてのコンテナは同じ IP を共有するから', en: 'Because all containers share the same IP' },
                    { ja: 'ポートフォワーディングで転送するから', en: 'Because of port forwarding' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'Docker Compose は自動的に bridge ネットワークを作成し、内蔵の DNS でサービス名を IP アドレスに解決します。これにより db:5432 のようにサービス名でアクセスできます。',
                    en: 'Docker Compose automatically creates a bridge network with built-in DNS that resolves service names to IP addresses. This enables access like db:5432.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 18
    {
        id: 18,
        slug: 'image-registry',
        level: 4,
        icon: '📦',
        title: { ja: 'イメージ管理と Docker Hub', en: 'Image Management & Docker Hub' },
        intro: {
            overview: {
                ja: 'Docker イメージのタグ付け、Docker Hub への push/pull、イメージ命名規則を学びます。チームでイメージを共有する実践的なスキルを身につけます。',
                en: 'Learn image tagging, push/pull to Docker Hub, and image naming conventions. Gain practical skills for sharing images with your team.',
            },
            why: {
                ja: 'ローカルで作ったイメージをチームメンバーやCI/CD、本番サーバーと共有するには、レジストリが必要です。Docker Hub は最もポピュラーなレジストリで、パブリック・プライベート両方のリポジトリを提供します。',
                en: 'Sharing locally built images with team members, CI/CD, and production servers requires a registry. Docker Hub is the most popular, offering both public and private repositories.',
            },
            before: { ja: 'イメージがローカルにしかない。他の人やサーバーと共有できない。', en: 'Images only exist locally. Cannot share with others or servers.' },
            after: { ja: 'Docker Hub 経由でチームや本番環境とイメージを共有。', en: 'Share images via Docker Hub with team and production.' },
        },
        goals: [
            { ja: 'イメージのタグ付けと命名規則を理解する', en: 'Understand image tagging and naming conventions' },
            { ja: 'Docker Hub にイメージを push/pull できる', en: 'Push/pull images to/from Docker Hub' },
            { ja: 'プライベートレジストリの概念を理解する', en: 'Understand private registry concepts' },
        ],
        concept: {
            content: {
                ja: '## イメージ命名規則\n\n### タグの構造\n```\n[レジストリ/] ユーザー名/リポジトリ名 :タグ\n```\n\n| 例 | 説明 |\n|-------|------|\n| `nginx:latest` | 公式イメージ（最新） |\n| `nginx:1.25-alpine` | 公式イメージ（バージョン指定） |\n| `myuser/myapp:v1.0` | ユーザーイメージ |\n| `ghcr.io/org/app:main` | GitHub Container Registry |\n\n### タグのベストプラクティス\n- `latest` は本番で使わない（どのバージョンか不明）\n- セマンティックバージョニング推奨: `v1.0.0`, `v1.0.1`\n- Git コミットハッシュも有用: `myapp:abc123f`\n\n---\n\n## Docker Hub 操作\n\n### 基本フロー\n- `docker login` : Docker Hub にログイン\n- `docker tag myapp myuser/myapp:v1.0` : タグ付け\n- `docker push myuser/myapp:v1.0` : アップロード\n- `docker pull myuser/myapp:v1.0` : ダウンロード',
                en: '## Image Naming Conventions\n\n### Tag Structure\n```\n[registry/] username/repository :tag\n```\n\n| Example | Description |\n|---------|-------------|\n| `nginx:latest` | Official image (latest) |\n| `nginx:1.25-alpine` | Official image (version pinned) |\n| `myuser/myapp:v1.0` | User image |\n| `ghcr.io/org/app:main` | GitHub Container Registry |\n\n### Tagging Best Practices\n- Don\'t use `latest` in production (version unknown)\n- Semantic versioning recommended: `v1.0.0`, `v1.0.1`\n- Git commit hashes also useful: `myapp:abc123f`\n\n---\n\n## Docker Hub Operations\n\n### Basic Flow\n- `docker login` : Log in to Docker Hub\n- `docker tag myapp myuser/myapp:v1.0` : Tag image\n- `docker push myuser/myapp:v1.0` : Upload\n- `docker pull myuser/myapp:v1.0` : Download',
            },
        },
        simulation: [
            {
                prompt: { ja: 'ローカルイメージにタグを付けましょう', en: 'Tag a local image' },
                expectedCommand: 'docker tag myapp myuser/myapp:v1.0',
                alternativeCommands: ['docker image tag myapp myuser/myapp:v1.0'],
                output: '(tagged successfully)',
                hint: { ja: 'docker tag <元> <新しいタグ> でタグを追加', en: 'Use docker tag <source> <new-tag> to add a tag' },
                xp: 20,
            },
            {
                prompt: { ja: 'タグ付けしたイメージを Docker Hub にプッシュしましょう', en: 'Push the tagged image to Docker Hub' },
                expectedCommand: 'docker push myuser/myapp:v1.0',
                alternativeCommands: [],
                output: `The push refers to repository [docker.io/myuser/myapp]
5f70bf18a086: Pushed
v1.0: digest: sha256:abc123... size: 1234`,
                hint: { ja: 'docker push <ユーザー名/リポジトリ:タグ> でプッシュ', en: 'Use docker push <user/repo:tag> to push' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'Docker Hub アカウントを作成し、docker login でログイン後、自作イメージにタグを付けて push してみましょう。',
                en: 'Create a Docker Hub account, login with docker login, tag your image and push it.',
            },
            commands: ['docker login', 'docker tag myapp <your-user>/myapp:v1.0', 'docker push <your-user>/myapp:v1.0', 'docker pull <your-user>/myapp:v1.0'],
        },
        checkpoint: [
            {
                question: {
                    ja: '本番環境でイメージタグ latest を使うべきでない理由は？',
                    en: 'Why shouldn\'t you use the latest tag in production?',
                },
                options: [
                    { ja: 'latest タグは使えないから', en: 'The latest tag cannot be used' },
                    { ja: 'どのバージョンがデプロイされているか分からなくなるから', en: 'You lose track of which version is deployed' },
                    { ja: 'latest は古いイメージだけを指すから', en: 'latest only refers to old images' },
                    { ja: 'latest タグは有料だから', en: 'The latest tag requires payment' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'latest は「最新」を指しますが、具体的にどのバージョンかは不明確です。問題発生時のロールバックや原因調査が困難になるため、本番では v1.0.0 のような明示的なタグを使いましょう。',
                    en: 'latest points to the newest version, but it\'s unclear which exact version. This makes rollback and debugging difficult. Use explicit tags like v1.0.0 in production.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 19
    {
        id: 19,
        slug: 'security-basics',
        level: 4,
        icon: '🔒',
        title: { ja: 'セキュリティの基本', en: 'Security Basics' },
        intro: {
            overview: {
                ja: 'Docker のセキュリティリスクと対策の基本を学びます。root ユーザー問題、USER 命令、イメージスキャン、secrets 管理を実践します。',
                en: 'Learn Docker security risks and basic countermeasures. Practice root user issues, USER instruction, image scanning, and secrets management.',
            },
            why: {
                ja: 'デフォルトではコンテナは root ユーザーで動作します。これはセキュリティリスクです。また、ベースイメージに既知の脆弱性が含まれる場合もあります。開発者が最低限知るべきセキュリティ知識を身につけましょう。',
                en: 'By default, containers run as root — a security risk. Base images may also contain known vulnerabilities. Learn the minimum security knowledge every developer needs.',
            },
            before: { ja: 'すべて root で実行。脆弱性を気にしない。秘密情報がDockerfileに。', en: 'Everything runs as root. Ignoring vulnerabilities. Secrets in Dockerfile.' },
            after: { ja: '非root ユーザー、イメージスキャン、secrets管理で安全な運用。', en: 'Non-root user, image scanning, secrets management for secure operations.' },
        },
        goals: [
            { ja: 'コンテナの root ユーザーリスクを理解する', en: 'Understand root user risks in containers' },
            { ja: 'USER 命令で非root 実行を設定できる', en: 'Configure non-root execution with USER instruction' },
            { ja: 'イメージスキャンで脆弱性を検出できる', en: 'Detect vulnerabilities with image scanning' },
        ],
        concept: {
            content: {
                ja: '## root ユーザー問題\n\nデフォルトではコンテナ内のプロセスは**root** で実行されます。\n\n### リスク\n- コンテナエスケープ時にホストの root 権限を取得される可能性\n- 不要な権限によるファイル操作のリスク\n\n### 対策: USER 命令\n```\nFROM node:18-alpine\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nWORKDIR /app\nCOPY . .\nRUN npm install\nUSER appuser\nCMD ["node", "app.js"]\n```\n\n---\n\n## イメージスキャン\n\n```\ndocker scout quickview myapp:latest\ndocker scout cves myapp:latest\n```\n\n既知の脆弱性（CVE）をスキャンし、影響度を確認できます。\n\n---\n\n## Secrets 管理のルール\n\n| ❌ やってはいけない | ✅ やるべき |\n|------------------|-----------|\n| Dockerfile に直接パスワードを記述 | 環境変数 or Docker Secrets |\n| イメージにAPIキーを含める | .env ファイル（.gitignore済み） |\n| Git に秘密情報をコミット | CI/CD の Secret 変数機能 |',
                en: '## Root User Problem\n\nBy default, processes inside containers run as **root**.\n\n### Risks\n- Container escape could grant host root access\n- Unnecessary privileges for file operations\n\n### Solution: USER Instruction\n```\nFROM node:18-alpine\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nWORKDIR /app\nCOPY . .\nRUN npm install\nUSER appuser\nCMD ["node", "app.js"]\n```\n\n---\n\n## Image Scanning\n\n```\ndocker scout quickview myapp:latest\ndocker scout cves myapp:latest\n```\n\nScan for known vulnerabilities (CVEs) and check their severity.\n\n---\n\n## Secrets Management Rules\n\n| ❌ Don\'t | ✅ Do |\n|----------|------|\n| Write passwords in Dockerfile | Use env vars or Docker Secrets |\n| Include API keys in images | .env files (.gitignored) |\n| Commit secrets to Git | CI/CD Secret variables |',
            },
        },
        simulation: [
            {
                prompt: { ja: 'コンテナが root で動いているか確認しましょう', en: 'Check if container is running as root' },
                expectedCommand: 'docker exec myapp-web-1 whoami',
                alternativeCommands: ['docker exec myapp_web_1 whoami'],
                output: 'root',
                hint: { ja: 'whoami で現在のユーザーを確認', en: 'Use whoami to check current user' },
                xp: 20,
            },
            {
                prompt: { ja: 'イメージの脆弱性をスキャンしましょう', en: 'Scan the image for vulnerabilities' },
                expectedCommand: 'docker scout quickview myapp:latest',
                alternativeCommands: ['docker scout cves myapp:latest'],
                output: `    ✓ Image stored for indexing
    ✓ Indexed 125 packages

  Target     myapp:latest
    digest   sha256:abc123...

    Vulnerabilities
    0C  2H  5M  12L
    (0 critical, 2 high, 5 medium, 12 low)`,
                hint: { ja: 'docker scout quickview でイメージの脆弱性概要を確認', en: 'Use docker scout quickview for vulnerability overview' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'Dockerfile に USER 命令を追加して非root ユーザーで実行するよう変更し、docker scout でイメージスキャンを実行してみましょう。',
                en: 'Add USER instruction to Dockerfile for non-root execution, then run docker scout to scan your image.',
            },
            commands: ['docker exec <container> whoami', 'docker scout quickview <image>', 'docker scout cves <image>'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Dockerfile で非root ユーザーを設定するための命令は？',
                    en: 'Which Dockerfile instruction sets a non-root user?',
                },
                options: [
                    { ja: 'RUN', en: 'RUN' },
                    { ja: 'CMD', en: 'CMD' },
                    { ja: 'USER', en: 'USER' },
                    { ja: 'ENV', en: 'ENV' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'USER 命令でコンテナ実行時のユーザーを指定します。事前に RUN adduser でユーザーを作成し、USER <ユーザー名> で切り替えるのがベストプラクティスです。',
                    en: 'The USER instruction specifies the runtime user. Best practice is to create a user with RUN adduser, then switch with USER <username>.',
                },
            },
        ],
        completionXP: 100,
    },

    // ─────────────────────────────────────────────
    // Level 5: CI/CD・チーム開発
    // ─────────────────────────────────────────────

    // Chapter 20
    {
        id: 20,
        slug: 'cicd-docker',
        level: 5,
        icon: '⚡',
        title: { ja: 'CI/CD と Docker', en: 'CI/CD & Docker' },
        intro: {
            overview: {
                ja: 'GitHub Actions を使って Docker の build → test → push を自動化する CI/CD パイプラインを学びます。',
                en: 'Learn CI/CD pipelines that automate Docker build → test → push using GitHub Actions.',
            },
            why: {
                ja: '手動で docker build して push するのは、チーム開発ではミスや漏れの原因になります。CI/CD で「コードを push したら自動でイメージがビルド・テスト・デプロイされる」仕組みを作ることで、品質と効率を同時に向上できます。',
                en: 'Manual docker build and push in team development leads to mistakes. CI/CD automates "push code → auto build, test, deploy" workflows, improving both quality and efficiency.',
            },
            before: { ja: '手動でビルド・テスト・デプロイ。ミスや手順の属人化。', en: 'Manual build, test, deploy. Mistakes and process knowledge silos.' },
            after: { ja: 'Git push するだけで自動的にビルド・テスト・デプロイ。', en: 'Just git push — automatic build, test, and deploy.' },
        },
        goals: [
            { ja: 'CI/CD の基本概念を理解する', en: 'Understand basic CI/CD concepts' },
            { ja: 'GitHub Actions でDockerビルドを自動化できる', en: 'Automate Docker builds with GitHub Actions' },
            { ja: 'CI/CD パイプラインを設計できる', en: 'Design CI/CD pipelines' },
        ],
        concept: {
            content: {
                ja: '## CI/CD とは\n\n| 用語 | 意味 | 具体例 |\n|------|------|--------|\n| **CI** (継続的インテグレーション) | コード変更を自動でビルド・テスト | push → 自動テスト |\n| **CD** (継続的デリバリー) | テスト通過後、自動でデプロイ準備 | テスト通過 → イメージ push |\n\n---\n\n## GitHub Actions の例\n\n```\n# .github/workflows/docker.yml\nname: Docker CI\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build image\n        run: docker build -t myapp .\n      - name: Run tests\n        run: docker run myapp npm test\n      - name: Push to Docker Hub\n        run: |\n          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin\n          docker tag myapp ${{ secrets.DOCKER_USER }}/myapp:${{ github.sha }}\n          docker push ${{ secrets.DOCKER_USER }}/myapp:${{ github.sha }}\n```\n\n### ポイント\n- **secrets** でパスワードを安全に管理\n- **github.sha** でコミットハッシュをタグに使用\n- push するたびに自動実行',
                en: '## What is CI/CD\n\n| Term | Meaning | Example |\n|------|---------|---------|\n| **CI** (Continuous Integration) | Auto build & test on code change | push → auto test |\n| **CD** (Continuous Delivery) | Auto deploy prep after tests pass | tests pass → image push |\n\n---\n\n## GitHub Actions Example\n\n```\n# .github/workflows/docker.yml\nname: Docker CI\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build image\n        run: docker build -t myapp .\n      - name: Run tests\n        run: docker run myapp npm test\n      - name: Push to Docker Hub\n        run: |\n          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin\n          docker tag myapp ${{ secrets.DOCKER_USER }}/myapp:${{ github.sha }}\n          docker push ${{ secrets.DOCKER_USER }}/myapp:${{ github.sha }}\n```\n\n### Key Points\n- **secrets** for secure password management\n- **github.sha** for commit hash tags\n- Auto-runs on every push',
            },
        },
        simulation: [
            {
                prompt: { ja: 'Docker イメージをビルドしましょう（CI の第一歩）', en: 'Build a Docker image (first CI step)' },
                expectedCommand: 'docker build -t myapp .',
                alternativeCommands: ['docker build -t myapp:latest .'],
                output: `[+] Building 8.5s (7/7) FINISHED
 => [1/4] FROM node:18-alpine
 => [2/4] WORKDIR /app
 => [3/4] COPY . .
 => [4/4] RUN npm install
 => exporting to image
 => => naming to docker.io/library/myapp:latest`,
                hint: { ja: 'docker build -t <名前> . でイメージをビルド', en: 'Use docker build -t <name> . to build' },
                xp: 20,
            },
            {
                prompt: { ja: 'ビルドしたイメージでテストを実行しましょう', en: 'Run tests in the built image' },
                expectedCommand: 'docker run myapp npm test',
                alternativeCommands: ['docker run --rm myapp npm test'],
                output: `> myapp@1.0.0 test
> jest

PASS  tests/app.test.js
  ✓ responds with hello (12ms)

Tests: 1 passed, 1 total`,
                hint: { ja: 'docker run <イメージ> <コマンド> でテストを実行', en: 'Use docker run <image> <command> to run tests' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'GitHub リポジトリに .github/workflows/docker.yml を作成し、push 時に自動でDockerビルドが実行されることを確認しましょう。',
                en: 'Create .github/workflows/docker.yml in your repo and verify that Docker builds run automatically on push.',
            },
            commands: ['docker build -t myapp .', 'docker run myapp npm test', 'docker tag myapp user/myapp:v1.0', 'docker push user/myapp:v1.0'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'CI/CD パイプラインで秘密情報（パスワード）を安全に扱う方法は？',
                    en: 'How do you securely handle secrets (passwords) in CI/CD pipelines?',
                },
                options: [
                    { ja: 'ワークフローファイルに直接書く', en: 'Write directly in workflow file' },
                    { ja: 'README に書いておく', en: 'Write in README' },
                    { ja: 'GitHub Secrets に登録し ${{ secrets.XXX }} で参照する', en: 'Register in GitHub Secrets and reference with ${{ secrets.XXX }}' },
                    { ja: 'コメントアウトして隠す', en: 'Hide by commenting out' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: 'GitHub Secrets（リポジトリ設定 → Secrets）に登録した値は暗号化され、ワークフロー内で ${{ secrets.XXX }} として安全に参照できます。ログにも出力されません。',
                    en: 'Values registered in GitHub Secrets (repo settings → Secrets) are encrypted and safely referenced as ${{ secrets.XXX }} in workflows. They are not printed in logs.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 21
    {
        id: 21,
        slug: 'deploy-strategy',
        level: 5,
        icon: '🚀',
        title: { ja: '本番デプロイ戦略', en: 'Production Deploy Strategies' },
        intro: {
            overview: {
                ja: 'Docker コンテナを本番環境にデプロイするための主要なクラウドサービスと戦略を学びます。',
                en: 'Learn major cloud services and strategies for deploying Docker containers to production.',
            },
            why: {
                ja: 'ローカルで動くアプリを本番で公開するには、ホスティング基盤の選択が必要です。コンテナ対応のクラウドサービスを理解し、プロジェクトに適した選択ができるようになりましょう。',
                en: 'Publishing a locally running app to production requires choosing a hosting platform. Understand container-compatible cloud services to make the right choice for your project.',
            },
            before: { ja: 'ローカルでしか動かない。デプロイ方法が分からない。', en: 'Only runs locally. Don\'t know how to deploy.' },
            after: { ja: 'クラウドサービスの選択肢を理解し、適切な戦略を選べる。', en: 'Understand cloud options and choose the right strategy.' },
        },
        goals: [
            { ja: '主要なコンテナホスティングサービスを理解する', en: 'Understand major container hosting services' },
            { ja: 'Compose を本番で使う場合の注意点を理解する', en: 'Understand caveats of using Compose in production' },
            { ja: 'デプロイ戦略の選択基準を理解する', en: 'Understand criteria for choosing deploy strategies' },
        ],
        concept: {
            content: {
                ja: '## コンテナホスティングの選択肢\n\n| サービス | プロバイダー | 特徴 |\n|---------|------------|------|\n| **ECS / Fargate** | AWS | フルマネージド、大規模向け |\n| **Container Apps** | Azure | サーバーレスコンテナ、簡単 |\n| **Cloud Run** | GCP | リクエスト駆動、従量課金 |\n| **Fly.io** | 独立系 | Dockerfile から直接デプロイ |\n| **Railway** | 独立系 | Git push でデプロイ、初心者向け |\n\n---\n\n## 本番での Docker Compose\n\n### 開発 vs 本番\n\n| 項目 | 開発 | 本番 |\n|------|------|------|\n| ビルド | 毎回ビルド | 事前ビルド済みイメージ |\n| ボリューム | bind mount | named volume |\n| ポート | ホスト直接公開 | リバースプロキシ経由 |\n| ログ | コンソール出力 | ログ集約サービス |\n| 再起動 | 手動 | `restart: always` |\n\n### 本番用 compose.prod.yml のポイント\n```\nservices:\n  web:\n    image: myuser/myapp:v1.0  # ビルド済みイメージ\n    restart: always\n    logging:\n      driver: json-file\n      options:\n        max-size: "10m"\n        max-file: "3"\n```',
                en: '## Container Hosting Options\n\n| Service | Provider | Features |\n|---------|----------|----------|\n| **ECS / Fargate** | AWS | Fully managed, large scale |\n| **Container Apps** | Azure | Serverless containers, simple |\n| **Cloud Run** | GCP | Request-driven, pay-per-use |\n| **Fly.io** | Independent | Deploy from Dockerfile directly |\n| **Railway** | Independent | Git push deploy, beginner-friendly |\n\n---\n\n## Docker Compose in Production\n\n### Dev vs Production\n\n| Aspect | Development | Production |\n|--------|-------------|------------|\n| Build | Build each time | Pre-built images |\n| Volumes | bind mount | named volume |\n| Ports | Direct host | Via reverse proxy |\n| Logs | Console output | Log aggregation |\n| Restart | Manual | `restart: always` |\n\n### Production compose.prod.yml Tips\n```\nservices:\n  web:\n    image: myuser/myapp:v1.0  # Pre-built image\n    restart: always\n    logging:\n      driver: json-file\n      options:\n        max-size: "10m"\n        max-file: "3"\n```',
            },
        },
        simulation: [
            {
                prompt: { ja: '本番用の設定でサービスを起動しましょう', en: 'Start services with production config' },
                expectedCommand: 'docker compose -f compose.yml -f compose.prod.yml up -d',
                alternativeCommands: ['docker-compose -f compose.yml -f compose.prod.yml up -d'],
                output: `[+] Running 3/3
 ✔ Network myapp_default    Created
 ✔ Container myapp-db-1     Started
 ✔ Container myapp-web-1    Started
(Production mode: pre-built image, restart: always)`,
                hint: { ja: '-f で本番用ファイルを指定', en: 'Use -f to specify production config files' },
                xp: 20,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'compose.prod.yml を作成し、開発用と本番用の設定の違いを確認しましょう。docker compose config で最終的なマージ結果を確認できます。',
                en: 'Create compose.prod.yml and compare dev vs production configs. Use docker compose config to see the final merged result.',
            },
            commands: ['docker compose -f compose.yml -f compose.prod.yml config', 'docker compose -f compose.yml -f compose.prod.yml up -d'],
        },
        checkpoint: [
            {
                question: {
                    ja: '本番環境の docker-compose.yml で restart: always を設定する理由は？',
                    en: 'Why set restart: always in production docker-compose.yml?',
                },
                options: [
                    { ja: 'ビルドを高速化するため', en: 'To speed up builds' },
                    { ja: 'コンテナが異常終了しても自動で再起動するため', en: 'To auto-restart containers after abnormal exit' },
                    { ja: 'ログを自動的に削除するため', en: 'To automatically delete logs' },
                    { ja: 'ネットワークを再設定するため', en: 'To reconfigure networking' },
                ],
                correctIndex: 1,
                explanation: {
                    ja: 'restart: always により、コンテナが異常終了やホスト再起動後に自動的に再起動します。本番環境でサービスの可用性を確保するための基本設定です。',
                    en: 'restart: always automatically restarts containers after crashes or host reboots. It\'s a fundamental setting for ensuring service availability in production.',
                },
            },
        ],
        completionXP: 100,
    },

    // Chapter 22
    {
        id: 22,
        slug: 'docker-mastery',
        level: 5,
        icon: '🏆',
        title: { ja: 'Docker 総まとめ', en: 'Docker Mastery' },
        intro: {
            overview: {
                ja: '全Levelで学んだ知識を統合する総合チャレンジです。Dockerfile設計 → Compose構成 → CI/CD設定の一連のフローを完遂します。',
                en: 'A comprehensive challenge integrating all Level knowledge. Complete the full flow: Dockerfile design → Compose setup → CI/CD configuration.',
            },
            why: {
                ja: 'ここまでの全知識を一つのプロジェクトで実践することで、Docker の全体像と実務での活用方法を確実に身につけます。これが Docker マスターへの最終ステップです。',
                en: 'Practicing all knowledge in one project solidifies your understanding of Docker\'s full picture and practical usage. This is the final step to Docker mastery.',
            },
            before: { ja: '個別の知識はあるが、全体を通したフローに不安がある。', en: 'Individual knowledge exists, but uncertain about the end-to-end flow.' },
            after: { ja: 'Dockerfile → Compose → CI/CD の全フローを自信を持って実践できる。', en: 'Confidently practice the full Dockerfile → Compose → CI/CD flow.' },
        },
        goals: [
            { ja: '全Levelの知識を統合したプロジェクトを構築できる', en: 'Build a project integrating all Level knowledge' },
            { ja: 'Docker の全体像を説明できる', en: 'Explain the full Docker picture' },
            { ja: '実務でDockerを活用する自信を持てる', en: 'Gain confidence to use Docker in practice' },
        ],
        concept: {
            content: {
                ja: '## Docker 全体フロー\n\n### 学んだこと一覧\n\n| Level | 主要スキル |\n|-------|----------|\n| **Lv.1** Docker 基礎 | コンテナの起動・停止・操作・ポート・ボリューム |\n| **Lv.2** Dockerfile | イメージ構築・レイヤー・マルチステージ |\n| **Lv.3** Compose | マルチサービス・環境変数・ヘルスチェック・開発ワークフロー |\n| **Lv.4** 実践・運用 | デバッグ・ネットワーク・Docker Hub・セキュリティ |\n| **Lv.5** CI/CD | 自動ビルド・テスト・デプロイ |\n\n---\n\n## 総合チャレンジ\n\n以下の要件を満たすプロジェクトを構築してみよう：\n\n- Dockerfile を書く（マルチステージ、非root ユーザー）\n- docker-compose.yml で3サービス構成（Web + DB + Cache）\n- healthcheck を定義\n- .env で設定を外部化\n- compose.override.yml で開発/本番を分離\n- Docker Hub にイメージを push\n- GitHub Actions で CI/CD を自動化',
                en: '## Docker Full Flow\n\n### Skills Summary\n\n| Level | Key Skills |\n|-------|-----------|\n| **Lv.1** Docker Basics | Container start/stop/manage/port/volume |\n| **Lv.2** Dockerfile | Image building, layers, multi-stage |\n| **Lv.3** Compose | Multi-service, env vars, healthcheck, dev workflow |\n| **Lv.4** Practice & Ops | Debug, networking, Docker Hub, security |\n| **Lv.5** CI/CD | Auto build, test, deploy |\n\n---\n\n## Final Challenge\n\nBuild a project meeting these requirements:\n\n- Write a Dockerfile (multi-stage, non-root user)\n- docker-compose.yml with 3 services (Web + DB + Cache)\n- Define healthchecks\n- Externalize config with .env\n- Separate dev/prod with compose.override.yml\n- Push images to Docker Hub\n- Automate CI/CD with GitHub Actions',
            },
        },
        simulation: [
            {
                prompt: { ja: '最終プロジェクト：イメージをマルチステージビルドしましょう', en: 'Final project: Build with multi-stage' },
                expectedCommand: 'docker build -t myproject .',
                alternativeCommands: ['docker build -t myproject:latest .'],
                output: `[+] Building 15.2s (12/12) FINISHED
 => [build 1/4] FROM node:18-alpine AS build
 => [build 2/4] COPY package.json .
 => [build 3/4] RUN npm install
 => [build 4/4] COPY . .
 => [prod 1/3] FROM node:18-alpine
 => [prod 2/3] COPY --from=build /app/dist ./dist
 => [prod 3/3] COPY --from=build /app/node_modules ./node_modules
 => exporting to image
 => => naming to docker.io/library/myproject:latest

Final image size: 95MB (vs 450MB without multi-stage)`,
                hint: { ja: 'docker build -t myproject . でマルチステージビルドを実行', en: 'Use docker build -t myproject . for multi-stage build' },
                xp: 30,
            },
            {
                prompt: { ja: '3サービス構成を起動して動作確認しましょう', en: 'Start and verify the 3-service stack' },
                expectedCommand: 'docker compose up -d',
                alternativeCommands: ['docker-compose up -d'],
                output: `[+] Running 4/4
 ✔ Network myproject_default    Created
 ✔ Container myproject-cache-1  Started
 ✔ Container myproject-db-1     Started (healthy)
 ✔ Container myproject-web-1    Started

🎉 All services running! Visit http://localhost:3000`,
                hint: { ja: 'docker compose up -d で全サービスをバックグラウンド起動', en: 'Use docker compose up -d to start all services' },
                xp: 30,
            },
        ],
        localPractice: {
            instructions: {
                ja: 'これまで学んだ全ての知識を使って、Dockerfile + docker-compose.yml + CI/CD をゼロから構築してみましょう。これができれば Docker マスターです！🐳',
                en: 'Using everything you\'ve learned, build Dockerfile + docker-compose.yml + CI/CD from scratch. If you can do this, you\'re a Docker master! 🐳',
            },
            commands: ['docker build -t myproject .', 'docker compose up -d', 'docker compose ps', 'docker push user/myproject:v1.0'],
        },
        checkpoint: [
            {
                question: {
                    ja: 'Docker を使った開発フローの正しい順番は？',
                    en: 'What is the correct Docker development flow?',
                },
                options: [
                    { ja: 'CI/CD → Dockerfile → Compose', en: 'CI/CD → Dockerfile → Compose' },
                    { ja: 'Compose → Dockerfile → push', en: 'Compose → Dockerfile → push' },
                    { ja: 'Dockerfile → build → Compose → CI/CD', en: 'Dockerfile → build → Compose → CI/CD' },
                    { ja: 'push → Compose → Dockerfile', en: 'push → Compose → Dockerfile' },
                ],
                correctIndex: 2,
                explanation: {
                    ja: '基本的な流れは：1) Dockerfile を書いてイメージを定義 → 2) docker build でイメージをビルド → 3) Compose でマルチサービス構成 → 4) CI/CD で自動化。この順番で段階的に構築していきます。',
                    en: 'The basic flow: 1) Write Dockerfile to define image → 2) docker build → 3) Compose for multi-service setup → 4) CI/CD for automation. Build step by step in this order.',
                },
            },
        ],
        completionXP: 200,
    },
];

export function getChapter(id: number): ChapterData | undefined {
    return chapters.find(c => c.id === id);
}

export function getChaptersByLevel(level: number): ChapterData[] {
    return chapters.filter(c => c.level === level);
}

export function getAllChapterIds(): number[] {
    return chapters.map(c => c.id);
}

export function getChapterNumberInLevel(chapter: ChapterData): number {
    const chaptersInLevel = chapters.filter(c => c.level === chapter.level);
    return chaptersInLevel.findIndex(c => c.id === chapter.id) + 1;
}
