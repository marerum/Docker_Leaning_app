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
                ja: '## コンテナのライフサイクル\n\n```\n作成 → 起動 → (実行中) → 停止 → 削除\n │      │                │      │\ncreate  start             stop   rm\n └── run (create + start) ──┘\n```\n\n### よく使うコマンド\n- `docker run -d` : バックグラウンドで起動（-d = detach）\n- `docker ps` : 稼働中のコンテナ一覧\n- `docker stop <ID>` : コンテナを停止\n- `docker rm <ID>` : コンテナを削除',
                en: '## Container Lifecycle\n\n```\nCreate → Start → (Running) → Stop → Remove\n │       │                  │      │\ncreate   start              stop   rm\n └── run (create + start) ──┘\n```\n\n### Common Commands\n- `docker run -d` : Run in background (-d = detach)\n- `docker ps` : List running containers\n- `docker stop <ID>` : Stop a container\n- `docker rm <ID>` : Remove a container',
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
