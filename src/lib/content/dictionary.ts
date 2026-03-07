// Dictionary data definitions
// Category hierarchy: mainCategory > subCategory

export type DictMainCategory = 'concept' | 'command';

export type DictSubCategory =
    | 'basic'
    | 'dockerfile'
    | 'dockerfile-cmd'
    | 'docker-image'
    | 'main-command'
    | 'option';

export interface DictionaryEntry {
    id: string;
    term: { ja: string; en: string };
    mainCategory: DictMainCategory;
    subCategory: DictSubCategory;
    group?: string;                     // optional sub-group within subCategory
    firstChapterId: number;
    summary: { ja: string; en: string };
    description: { ja: string; en: string };
    examples: { ja: string; en: string };
    relatedTerms?: string[];
}

// ─── Category labels ──────────────────

export const MAIN_CATEGORY_LABELS: Record<DictMainCategory, { ja: string; en: string; icon: string }> = {
    concept: { ja: '概念・関連用語', en: 'Concepts & Terms', icon: '📖' },
    command: { ja: 'コマンド', en: 'Commands', icon: '💻' },
};

export const SUB_CATEGORY_LABELS: Record<DictSubCategory, { ja: string; en: string; parent: DictMainCategory }> = {
    'basic': { ja: '基本用語', en: 'Basic Terms', parent: 'concept' },
    'dockerfile': { ja: 'Dockerfile', en: 'Dockerfile', parent: 'concept' },
    'dockerfile-cmd': { ja: 'Dockerfile命令', en: 'Dockerfile Instructions', parent: 'concept' },
    'docker-image': { ja: 'Docker Image', en: 'Docker Image', parent: 'concept' },
    'main-command': { ja: 'メインコマンド', en: 'Main Commands', parent: 'command' },
    'option': { ja: 'オプション', en: 'Options', parent: 'command' },
};

// ─── Group labels (sub-groups within subCategories) ──────────────────

export const GROUP_LABELS: Record<string, { ja: string; en: string }> = {
    // basic
    'container-general': { ja: 'コンテナ一般の概念', en: 'General Container Concepts' },
    'docker-specific': { ja: 'Docker の基本概念', en: 'Docker-Specific Concepts' },
    // main-command
    'system-info': { ja: 'システム情報', en: 'System Information' },
    'container-ops': { ja: 'コンテナ操作', en: 'Container Operations' },
    'volume-ops': { ja: 'ボリューム操作', en: 'Volume Operations' },
    'image-ops': { ja: 'イメージ操作', en: 'Image Operations' },
    // option
    'run-options': { ja: 'コンテナ実行オプション', en: 'Container Run Options' },
    'build-options': { ja: 'ビルドオプション', en: 'Build Options' },
};

// ─── Dictionary entries ──────────────────

export const dictionaryEntries: DictionaryEntry[] = [

    // ═══════════════════════════════════════
    // 📖 概念・関連用語 > 基本用語
    //    コンテナ一般の概念 → Docker の基本概念 の順
    // ═══════════════════════════════════════

    // ── コンテナ一般の概念 ──

    {
        id: 'container',
        term: { ja: 'コンテナ', en: 'Container' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 1,
        summary: { ja: 'アプリと実行環境をまとめた軽量な実行単位', en: 'Lightweight execution unit bundling app and runtime' },
        description: {
            ja: 'イメージから作成された実行中のインスタンス。アプリケーションに必要なライブラリ、設定を含み、ホストOSのカーネルを共有して動作する。作成→起動→停止→削除のライフサイクルを持つ。',
            en: 'A running instance created from an image. Contains libraries and configs needed by the app, sharing the host OS kernel. Has a lifecycle of create → start → stop → remove.',
        },
        examples: {
            ja: '# コンテナを起動\ndocker run -d nginx\n\n# コンテナ一覧\ndocker ps\n\n# コンテナを停止・削除\ndocker stop <ID>\ndocker rm <ID>',
            en: '# Start a container\ndocker run -d nginx\n\n# List containers\ndocker ps\n\n# Stop and remove\ndocker stop <ID>\ndocker rm <ID>',
        },
        relatedTerms: ['image', 'lifecycle', 'docker-run'],
    },
    {
        id: 'image',
        term: { ja: 'イメージ', en: 'Image' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 2,
        summary: { ja: 'コンテナの元となる読み取り専用テンプレート', en: 'Read-only template for creating containers' },
        description: {
            ja: 'コンテナを作成するための設計図。読み取り専用で、1つのイメージから複数のコンテナを作成できる。Docker Hubで公開されている公式イメージ（nginx, ubuntu等）を利用するか、Dockerfileで独自に作成する。',
            en: 'A blueprint for creating containers. Read-only — multiple containers can be created from one image. Use official images from Docker Hub (nginx, ubuntu, etc.) or create custom ones with Dockerfiles.',
        },
        examples: {
            ja: '# イメージ一覧\ndocker images\n\n# イメージからコンテナ起動\ndocker run nginx\n\n# イメージをDocker Hubからダウンロード\ndocker pull ubuntu',
            en: '# List images\ndocker images\n\n# Start container from image\ndocker run nginx\n\n# Download image from Docker Hub\ndocker pull ubuntu',
        },
        relatedTerms: ['container', 'dockerfile', 'docker-hub', 'layer', 'tag'],
    },
    {
        id: 'lifecycle',
        term: { ja: 'コンテナライフサイクル', en: 'Container Lifecycle' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 3,
        summary: { ja: '作成→起動→停止→削除の一連の流れ', en: 'The create → start → stop → remove flow' },
        description: {
            ja: 'コンテナは「作成(create)→起動(start)→停止(stop)→削除(rm)」のライフサイクルを持つ。docker run はcreate＋startを一度に行う。コンテナは使い捨てが前提で、必要に応じて何度でも再作成できる。',
            en: 'Containers follow a lifecycle of "create → start → stop → remove." docker run combines create + start. Containers are designed to be disposable — recreate as needed.',
        },
        examples: {
            ja: '# 一連のライフサイクル\ndocker run -d nginx      # 作成+起動\ndocker stop <ID>         # 停止\ndocker start <ID>        # 再起動\ndocker rm <ID>           # 削除',
            en: '# Full lifecycle\ndocker run -d nginx      # Create+Start\ndocker stop <ID>         # Stop\ndocker start <ID>        # Restart\ndocker rm <ID>           # Remove',
        },
        relatedTerms: ['container', 'docker-run', 'docker-stop', 'docker-rm'],
    },
    {
        id: 'port-mapping',
        term: { ja: 'ポートマッピング', en: 'Port Mapping' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 5,
        summary: { ja: 'ホストとコンテナのポートを接続する仕組み', en: 'Mechanism to connect host and container ports' },
        description: {
            ja: 'コンテナは独自のネットワークを持ち、外部からは直接アクセスできない。-p オプションでホストのポートとコンテナのポートを接続し、ブラウザ等からアクセスできるようにする。',
            en: 'Containers have their own network and are not directly accessible. The -p option connects host ports to container ports, enabling access from browsers, etc.',
        },
        examples: {
            ja: '# ホストの8080番をコンテナの80番に接続\ndocker run -d -p 8080:80 nginx\n\n# ブラウザで確認:\n# http://localhost:8080',
            en: '# Map host 8080 to container 80\ndocker run -d -p 8080:80 nginx\n\n# Check in browser:\n# http://localhost:8080',
        },
        relatedTerms: ['opt-p'],
    },
    {
        id: 'volume',
        term: { ja: 'ボリューム', en: 'Volume' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 6,
        summary: { ja: 'Dockerが管理するデータ永続化領域', en: 'Docker-managed data persistence area' },
        description: {
            ja: 'コンテナのライフサイクルとは独立してデータを保持する仕組み。Dockerエンジンが管理するため、コンテナを削除してもデータは残る。DBのデータ保存等に使用。',
            en: 'A mechanism to persist data independently of the container lifecycle. Managed by Docker engine — data survives container removal. Used for DB data storage, etc.',
        },
        examples: {
            ja: '# ボリューム作成\ndocker volume create mydata\n\n# ボリューム一覧\ndocker volume ls\n\n# ボリュームをマウントして起動\ndocker run -v mydata:/data nginx',
            en: '# Create volume\ndocker volume create mydata\n\n# List volumes\ndocker volume ls\n\n# Start with mounted volume\ndocker run -v mydata:/data nginx',
        },
        relatedTerms: ['bind-mount', 'opt-v'],
    },
    {
        id: 'bind-mount',
        term: { ja: 'バインドマウント', en: 'Bind Mount' },
        mainCategory: 'concept', subCategory: 'basic', group: 'container-general', firstChapterId: 6,
        summary: { ja: 'ホストのフォルダをコンテナに直接接続する方式', en: 'Method to directly connect a host folder to a container' },
        description: {
            ja: 'ホストマシンの任意のフォルダをコンテナ内にマウントする方法。開発中のソースコードをリアルタイムで反映させたい場合に便利。ボリュームとは異なりDockerが管理しない。',
            en: 'Mounts any host machine folder into a container. Useful for reflecting source code changes in real-time during development. Unlike volumes, not managed by Docker.',
        },
        examples: {
            ja: '# カレントディレクトリをマウント\ndocker run -v $(pwd):/app nginx\n\n# Windows PowerShellの場合\ndocker run -v ${PWD}:/app nginx',
            en: '# Mount current directory\ndocker run -v $(pwd):/app nginx\n\n# Windows PowerShell\ndocker run -v ${PWD}:/app nginx',
        },
        relatedTerms: ['volume', 'opt-v'],
    },

    // ── Docker の基本概念 ──

    {
        id: 'docker',
        term: { ja: 'Docker', en: 'Docker' },
        mainCategory: 'concept', subCategory: 'basic', group: 'docker-specific', firstChapterId: 1,
        summary: { ja: 'コンテナ仮想化プラットフォーム', en: 'Container virtualization platform' },
        description: {
            ja: 'アプリケーションとその実行環境を「コンテナ」という単位でパッケージ化し、どの環境でも同じように動作させるためのプラットフォーム。従来の仮想マシン（VM）と比べて軽量で高速。',
            en: 'A platform that packages applications and their runtime environment into units called "containers", ensuring consistent behavior across any environment. Lightweight and fast compared to traditional VMs.',
        },
        examples: {
            ja: '# Dockerのバージョン確認\ndocker version\n\n# Docker環境の詳細情報\ndocker info',
            en: '# Check Docker version\ndocker version\n\n# Docker environment details\ndocker info',
        },
        relatedTerms: ['container', 'image', 'docker-hub'],
    },
    {
        id: 'docker-hub',
        term: { ja: 'Docker Hub', en: 'Docker Hub' },
        mainCategory: 'concept', subCategory: 'basic', group: 'docker-specific', firstChapterId: 7,
        summary: { ja: 'Docker公式のイメージレジストリ(共有サイト)', en: 'Docker official image registry' },
        description: {
            ja: 'Dockerイメージを保管・共有するためのクラウドサービス。nginx、ubuntu、node等の公式イメージが無料で利用でき、自作イメージもアップロードできる。',
            en: 'Cloud service for storing and sharing Docker images. Official images (nginx, ubuntu, node, etc.) are freely available, and you can upload custom images.',
        },
        examples: {
            ja: '# Docker Hubからイメージをダウンロード\ndocker pull nginx\n\n# Docker Hubにイメージをアップロード\ndocker push myuser/myapp:v1',
            en: '# Download from Docker Hub\ndocker pull nginx\n\n# Upload to Docker Hub\ndocker push myuser/myapp:v1',
        },
        relatedTerms: ['image', 'tag'],
    },
    {
        id: 'nginx',
        term: { ja: 'nginx', en: 'nginx' },
        mainCategory: 'concept', subCategory: 'basic', group: 'docker-specific', firstChapterId: 3,
        summary: { ja: '軽量Webサーバー。本カリキュラムの練習用イメージ', en: 'Lightweight web server. Practice image for this curriculum' },
        description: {
            ja: '世界中で広く使われている軽量なWebサーバー（エンジンエックスと読む）。Docker公式イメージが提供されており、docker runするだけで即座にWebサーバーが起動するため、Docker学習に最適。',
            en: 'A widely-used lightweight web server (pronounced "engine-x"). Docker provides an official image — a single docker run instantly starts a web server, making it ideal for Docker learning.',
        },
        examples: {
            ja: '# nginxをバックグラウンドで起動\ndocker run -d nginx\n\n# ポート8080で公開\ndocker run -d -p 8080:80 nginx',
            en: '# Start nginx in background\ndocker run -d nginx\n\n# Expose on port 8080\ndocker run -d -p 8080:80 nginx',
        },
        relatedTerms: ['image', 'docker-run', 'port-mapping'],
    },

    // ═══════════════════════════════════════
    // 📖 概念・関連用語 > Dockerfile
    // ═══════════════════════════════════════

    {
        id: 'dockerfile',
        term: { ja: 'Dockerfile', en: 'Dockerfile' },
        mainCategory: 'concept', subCategory: 'dockerfile', firstChapterId: 7,
        summary: { ja: 'Dockerイメージの設計図（テキストファイル）', en: 'Blueprint for Docker images (text file)' },
        description: {
            ja: 'Dockerイメージを自動的に構築するための設計図。FROM、RUN、COPY等の命令を記述し、docker build でイメージを生成する。ファイル名は「Dockerfile」（拡張子なし）。',
            en: 'A blueprint for automatically building Docker images. Contains instructions like FROM, RUN, COPY, etc. Use docker build to generate images. File name is "Dockerfile" (no extension).',
        },
        examples: {
            ja: '# Dockerfile の例\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]',
            en: '# Dockerfile example\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]',
        },
        relatedTerms: ['df-from', 'df-run', 'df-copy', 'df-cmd', 'docker-build'],
    },
    {
        id: 'dockerignore',
        term: { ja: '.dockerignore', en: '.dockerignore' },
        mainCategory: 'concept', subCategory: 'dockerfile', firstChapterId: 8,
        summary: { ja: 'ビルド時に除外するファイルを指定する設定ファイル', en: 'Config file specifying files to exclude during build' },
        description: {
            ja: 'docker build 時にビルドコンテキストから除外するファイルやディレクトリを指定する。node_modules/ や .git/ を除外することでビルドが高速化し、イメージサイズも小さくなる。',
            en: 'Specifies files/directories to exclude from the build context. Excluding node_modules/ and .git/ speeds up builds and reduces image size.',
        },
        examples: {
            ja: '# .dockerignore の例\nnode_modules\n.git\n*.md\n.env',
            en: '# .dockerignore example\nnode_modules\n.git\n*.md\n.env',
        },
        relatedTerms: ['dockerfile', 'build-cache'],
    },

    // ═══════════════════════════════════════
    // 📖 概念・関連用語 > Dockerfile命令
    // ═══════════════════════════════════════

    {
        id: 'df-from',
        term: { ja: 'FROM', en: 'FROM' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 7,
        summary: { ja: 'ベースイメージを指定（Dockerfileの最初の命令）', en: 'Specify base image (first Dockerfile instruction)' },
        description: {
            ja: 'Dockerfileの最初に記述し、ベースとなるイメージを指定する。全てのDockerfileはFROMから始まる。マルチステージビルドでは複数のFROMを使用できる。',
            en: 'Written first in a Dockerfile to specify the base image. Every Dockerfile starts with FROM. Multiple FROMs can be used in multi-stage builds.',
        },
        examples: { ja: 'FROM node:18-alpine\nFROM ubuntu:22.04\nFROM python:3.11-slim', en: 'FROM node:18-alpine\nFROM ubuntu:22.04\nFROM python:3.11-slim' },
        relatedTerms: ['dockerfile', 'base-image', 'multi-stage-build'],
    },
    {
        id: 'df-run',
        term: { ja: 'RUN', en: 'RUN' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 7,
        summary: { ja: 'イメージビルド時にコマンドを実行', en: 'Execute commands during image build' },
        description: {
            ja: 'イメージのビルド時にシェルコマンドを実行する。パッケージのインストールやファイルの設定に使用。各RUN命令が1つのレイヤーを作成する。',
            en: 'Executes shell commands during image build. Used for package installation and file configuration. Each RUN creates one layer.',
        },
        examples: { ja: 'RUN npm install\nRUN apt-get update && apt-get install -y curl', en: 'RUN npm install\nRUN apt-get update && apt-get install -y curl' },
        relatedTerms: ['dockerfile', 'layer'],
    },
    {
        id: 'df-copy',
        term: { ja: 'COPY', en: 'COPY' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 7,
        summary: { ja: 'ホストのファイルをイメージにコピー', en: 'Copy files from host to image' },
        description: {
            ja: 'ビルドコンテキスト（ホストのファイル）をイメージ内にコピーする。ソースコードや設定ファイルをイメージに含めるために使用。',
            en: 'Copies files from the build context (host) into the image. Used to include source code and config files in the image.',
        },
        examples: { ja: 'COPY package.json .\nCOPY . /app\nCOPY --from=builder /app/dist ./dist', en: 'COPY package.json .\nCOPY . /app\nCOPY --from=builder /app/dist ./dist' },
        relatedTerms: ['dockerfile', 'df-copy-from'],
    },
    {
        id: 'df-workdir',
        term: { ja: 'WORKDIR', en: 'WORKDIR' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 7,
        summary: { ja: '作業ディレクトリを設定', en: 'Set working directory' },
        description: {
            ja: '以降のRUN、CMD、COPY等の命令の作業ディレクトリを設定する。ディレクトリが存在しない場合は自動的に作成される。',
            en: 'Sets the working directory for subsequent RUN, CMD, COPY instructions. Directory is automatically created if it does not exist.',
        },
        examples: { ja: 'WORKDIR /app\nWORKDIR /usr/src/app', en: 'WORKDIR /app\nWORKDIR /usr/src/app' },
        relatedTerms: ['dockerfile'],
    },
    {
        id: 'df-cmd',
        term: { ja: 'CMD', en: 'CMD' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 7,
        summary: { ja: 'コンテナ起動時のデフォルトコマンドを指定', en: 'Specify default command on container start' },
        description: {
            ja: 'コンテナが起動したときに実行されるデフォルトのコマンドを定義する。Dockerfileに1つだけ記述可能（複数ある場合は最後のものが有効）。docker runでコマンドを指定すると上書きされる。',
            en: 'Defines the default command executed when a container starts. Only one CMD per Dockerfile (last one wins). Overridden by commands specified in docker run.',
        },
        examples: { ja: 'CMD ["node", "app.js"]\nCMD ["npm", "start"]\nCMD ["python", "main.py"]', en: 'CMD ["node", "app.js"]\nCMD ["npm", "start"]\nCMD ["python", "main.py"]' },
        relatedTerms: ['dockerfile', 'docker-run'],
    },
    {
        id: 'df-copy-from',
        term: { ja: 'COPY --from', en: 'COPY --from' },
        mainCategory: 'concept', subCategory: 'dockerfile-cmd', firstChapterId: 9,
        summary: { ja: 'マルチステージビルドで別ステージからファイルをコピー', en: 'Copy files from another stage in multi-stage builds' },
        description: {
            ja: 'マルチステージビルドで、前のビルドステージで生成されたファイルを最終イメージにコピーする。ビルドツールを含まない軽量なイメージを作成するために必須。',
            en: 'In multi-stage builds, copies files generated in a previous build stage to the final image. Essential for creating lightweight images without build tools.',
        },
        examples: { ja: '# builder ステージからdistをコピー\nCOPY --from=builder /app/dist ./dist', en: '# Copy dist from builder stage\nCOPY --from=builder /app/dist ./dist' },
        relatedTerms: ['multi-stage-build', 'df-copy'],
    },

    // ═══════════════════════════════════════
    // 📖 概念・関連用語 > Docker Image
    // ═══════════════════════════════════════

    {
        id: 'base-image',
        term: { ja: 'ベースイメージ', en: 'Base Image' },
        mainCategory: 'concept', subCategory: 'docker-image', firstChapterId: 7,
        summary: { ja: 'FROMで指定する土台となるイメージ', en: 'Foundation image specified by FROM' },
        description: {
            ja: 'DockerfileのFROMで指定する、イメージの土台。OS（ubuntu、alpine等）やランタイム（node、python等）が含まれている。alpineタグは軽量版を意味する。',
            en: 'The foundation specified by FROM in a Dockerfile. Contains OS (ubuntu, alpine, etc.) or runtime (node, python, etc.). Alpine tag means lightweight version.',
        },
        examples: { ja: 'FROM node:18-alpine    # 軽量版\nFROM ubuntu:22.04      # Ubuntu\nFROM python:3.11-slim  # 軽量版Python', en: 'FROM node:18-alpine    # Lightweight\nFROM ubuntu:22.04      # Ubuntu\nFROM python:3.11-slim  # Slim Python' },
        relatedTerms: ['df-from', 'tag', 'image'],
    },
    {
        id: 'tag',
        term: { ja: 'タグ', en: 'Tag' },
        mainCategory: 'concept', subCategory: 'docker-image', firstChapterId: 7,
        summary: { ja: 'イメージのバージョンを識別するラベル', en: 'Label identifying image version' },
        description: {
            ja: 'イメージ名の後に「:」で区切って指定するバージョンラベル。省略するとlatestが使われる。例: node:18-alpine の「18-alpine」がタグ。',
            en: 'A version label appended to the image name with ":". Defaults to "latest" if omitted. Example: "18-alpine" in node:18-alpine is the tag.',
        },
        examples: { ja: 'docker pull nginx:latest\ndocker pull node:18-alpine\ndocker build -t myapp:v1 .', en: 'docker pull nginx:latest\ndocker pull node:18-alpine\ndocker build -t myapp:v1 .' },
        relatedTerms: ['image', 'opt-t'],
    },
    {
        id: 'layer',
        term: { ja: 'レイヤー', en: 'Layer' },
        mainCategory: 'concept', subCategory: 'docker-image', firstChapterId: 8,
        summary: { ja: 'Dockerfileの各命令が生成するイメージの構成単位', en: 'Image building block created by each Dockerfile instruction' },
        description: {
            ja: 'Dockerfileの各命令（FROM、RUN、COPY等）が1つのレイヤーを作る。レイヤーは読み取り専用で積み重ねられる。変更がないレイヤーはキャッシュされ、ビルドが高速化される。',
            en: 'Each Dockerfile instruction (FROM, RUN, COPY, etc.) creates one layer. Layers are read-only and stacked. Unchanged layers are cached, speeding up builds.',
        },
        examples: { ja: '# レイヤー構造を確認\ndocker history myapp', en: '# Check layer structure\ndocker history myapp' },
        relatedTerms: ['build-cache', 'dockerfile', 'docker-history'],
    },
    {
        id: 'build-cache',
        term: { ja: 'ビルドキャッシュ', en: 'Build Cache' },
        mainCategory: 'concept', subCategory: 'docker-image', firstChapterId: 8,
        summary: { ja: 'レイヤー単位で再利用される高速ビルドの仕組み', en: 'Fast build mechanism reusing layers' },
        description: {
            ja: '変更がないレイヤーを再利用して（CACHED）ビルドを高速化する仕組み。あるレイヤーが変更されると、それ以降の全レイヤーが再ビルドされる。変更が少ないものを先に書くのがベストプラクティス。',
            en: 'Mechanism that reuses unchanged layers (CACHED) to speed up builds. When a layer changes, all subsequent layers are rebuilt. Best practice: put less frequently changed items first.',
        },
        examples: { ja: '# 2回目のビルドはキャッシュで高速\ndocker build -t myapp .\n# => CACHED [1/5] FROM ...\n# => CACHED [2/5] WORKDIR ...', en: '# Second build is fast with cache\ndocker build -t myapp .\n# => CACHED [1/5] FROM ...\n# => CACHED [2/5] WORKDIR ...' },
        relatedTerms: ['layer', 'dockerignore'],
    },
    {
        id: 'multi-stage-build',
        term: { ja: 'マルチステージビルド', en: 'Multi-Stage Build' },
        mainCategory: 'concept', subCategory: 'docker-image', firstChapterId: 9,
        summary: { ja: 'ビルドと実行を分離し軽量イメージを作る手法', en: 'Technique separating build and runtime for lean images' },
        description: {
            ja: '1つのDockerfileに複数のFROMを記述し、ビルド段階と実行段階を分離する。ビルドツール（コンパイラ等）を最終イメージに含めず、実行に必要なファイルだけの軽量イメージを作成する。',
            en: 'Uses multiple FROM statements in one Dockerfile to separate build and runtime stages. Excludes build tools from the final image, creating lightweight images with only runtime files.',
        },
        examples: {
            ja: '# ステージ1: ビルド\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# ステージ2: 実行用（軽量）\nFROM node:18-alpine\nCOPY --from=builder /app/dist ./dist\nCMD ["node", "dist/index.js"]',
            en: '# Stage 1: Build\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# Stage 2: Runtime (lightweight)\nFROM node:18-alpine\nCOPY --from=builder /app/dist ./dist\nCMD ["node", "dist/index.js"]',
        },
        relatedTerms: ['df-from', 'df-copy-from', 'layer'],
    },

    // ═══════════════════════════════════════
    // 💻 コマンド > メインコマンド
    // ═══════════════════════════════════════

    {
        id: 'docker-version',
        term: { ja: 'docker version', en: 'docker version' },
        mainCategory: 'command', subCategory: 'main-command', group: 'system-info', firstChapterId: 1,
        summary: { ja: 'Dockerのバージョン情報を表示', en: 'Display Docker version info' },
        description: { ja: 'Dockerクライアントとサーバーのバージョン情報を表示する。Dockerが正しくインストールされているか確認する最初のコマンド。', en: 'Shows Docker client and server version info. The first command to verify Docker is installed correctly.' },
        examples: { ja: 'docker version\ndocker --version', en: 'docker version\ndocker --version' },
    },
    {
        id: 'docker-info',
        term: { ja: 'docker info', en: 'docker info' },
        mainCategory: 'command', subCategory: 'main-command', group: 'system-info', firstChapterId: 1,
        summary: { ja: 'Docker環境の詳細情報を表示', en: 'Display Docker environment details' },
        description: { ja: 'コンテナ数、イメージ数、ストレージドライバ、CPU、メモリ等のDocker環境全体の情報を表示する。', en: 'Shows overall Docker environment info: container count, image count, storage driver, CPU, memory, etc.' },
        examples: { ja: 'docker info', en: 'docker info' },
    },
    {
        id: 'docker-run',
        term: { ja: 'docker run', en: 'docker run' },
        mainCategory: 'command', subCategory: 'main-command', group: 'container-ops', firstChapterId: 2,
        summary: { ja: 'イメージからコンテナを作成・起動', en: 'Create and start a container from an image' },
        description: {
            ja: 'Dockerで最も基本的なコマンド。イメージからコンテナを作成し起動する。イメージがローカルにない場合はDocker Hubから自動でダウンロードする。create + start を同時に行う。',
            en: 'The most fundamental Docker command. Creates and starts a container from an image. Auto-downloads from Docker Hub if not available locally. Combines create + start.',
        },
        examples: {
            ja: 'docker run hello-world\ndocker run -d nginx\ndocker run -d -p 8080:80 nginx\ndocker run -it ubuntu bash\ndocker run -v mydata:/data nginx',
            en: 'docker run hello-world\ndocker run -d nginx\ndocker run -d -p 8080:80 nginx\ndocker run -it ubuntu bash\ndocker run -v mydata:/data nginx',
        },
        relatedTerms: ['opt-d', 'opt-it', 'opt-p', 'opt-v', 'container', 'image'],
    },
    {
        id: 'docker-ps',
        term: { ja: 'docker ps', en: 'docker ps' },
        mainCategory: 'command', subCategory: 'main-command', group: 'container-ops', firstChapterId: 2,
        summary: { ja: 'コンテナの一覧を表示', en: 'List containers' },
        description: { ja: '稼働中のコンテナ一覧を表示する。-a オプションで停止中のコンテナも含めて全て表示する。', en: 'Lists running containers. With -a option, shows all containers including stopped ones.' },
        examples: { ja: 'docker ps          # 稼働中のみ\ndocker ps -a       # 全て表示', en: 'docker ps          # Running only\ndocker ps -a       # Show all' },
        relatedTerms: ['opt-a', 'container'],
    },
    {
        id: 'docker-stop',
        term: { ja: 'docker stop', en: 'docker stop' },
        mainCategory: 'command', subCategory: 'main-command', group: 'container-ops', firstChapterId: 3,
        summary: { ja: '稼働中のコンテナを停止', en: 'Stop a running container' },
        description: { ja: '稼働中のコンテナにシグナルを送り、安全に停止させる。コンテナIDの先頭数文字や名前でも指定可能。', en: 'Sends a signal to gracefully stop a running container. Can specify by first few chars of container ID or name.' },
        examples: { ja: 'docker stop f8a3\ndocker stop my_container', en: 'docker stop f8a3\ndocker stop my_container' },
        relatedTerms: ['docker-rm', 'lifecycle'],
    },
    {
        id: 'docker-rm',
        term: { ja: 'docker rm', en: 'docker rm' },
        mainCategory: 'command', subCategory: 'main-command', group: 'container-ops', firstChapterId: 3,
        summary: { ja: 'コンテナを削除', en: 'Remove a container' },
        description: { ja: '停止済みのコンテナを削除する。稼働中のコンテナを削除するには先にstopするか、-fオプションを使う。', en: 'Removes a stopped container. To remove a running container, stop it first or use the -f option.' },
        examples: { ja: 'docker rm f8a3\ndocker rm -f my_container', en: 'docker rm f8a3\ndocker rm -f my_container' },
        relatedTerms: ['docker-stop', 'lifecycle'],
    },
    {
        id: 'docker-exec',
        term: { ja: 'docker exec', en: 'docker exec' },
        mainCategory: 'command', subCategory: 'main-command', group: 'container-ops', firstChapterId: 4,
        summary: { ja: '稼働中のコンテナ内でコマンドを実行', en: 'Execute a command in a running container' },
        description: {
            ja: '稼働中のコンテナに追加のプロセスとしてコマンドを実行する。-itと組み合わせてシェルに入るのが一般的。元のプロセスには影響しない。',
            en: 'Runs a command as an additional process in a running container. Commonly combined with -it to enter a shell. Does not affect the main process.',
        },
        examples: { ja: 'docker exec -it <ID> bash\ndocker exec <ID> cat /etc/nginx/nginx.conf', en: 'docker exec -it <ID> bash\ndocker exec <ID> cat /etc/nginx/nginx.conf' },
        relatedTerms: ['opt-it', 'container'],
    },
    {
        id: 'docker-volume-create',
        term: { ja: 'docker volume create', en: 'docker volume create' },
        mainCategory: 'command', subCategory: 'main-command', group: 'volume-ops', firstChapterId: 6,
        summary: { ja: 'ボリュームを作成', en: 'Create a volume' },
        description: { ja: '名前付きボリュームを作成する。作成したボリュームは docker run -v で使用できる。', en: 'Creates a named volume. Created volumes can be used with docker run -v.' },
        examples: { ja: 'docker volume create mydata', en: 'docker volume create mydata' },
        relatedTerms: ['volume', 'docker-volume-ls'],
    },
    {
        id: 'docker-volume-ls',
        term: { ja: 'docker volume ls', en: 'docker volume ls' },
        mainCategory: 'command', subCategory: 'main-command', group: 'volume-ops', firstChapterId: 6,
        summary: { ja: 'ボリューム一覧を表示', en: 'List volumes' },
        description: { ja: '作成済みのボリューム一覧を表示する。', en: 'Lists all created volumes.' },
        examples: { ja: 'docker volume ls', en: 'docker volume ls' },
        relatedTerms: ['volume', 'docker-volume-create'],
    },
    {
        id: 'docker-build',
        term: { ja: 'docker build', en: 'docker build' },
        mainCategory: 'command', subCategory: 'main-command', group: 'image-ops', firstChapterId: 7,
        summary: { ja: 'Dockerfileからイメージをビルド', en: 'Build an image from a Dockerfile' },
        description: {
            ja: 'Dockerfileの命令に従ってイメージを作成する。-tオプションでイメージ名とタグを指定する。末尾の「.」はビルドコンテキスト（Dockerfileの場所）を示す。',
            en: 'Creates an image following Dockerfile instructions. Use -t to specify image name and tag. The trailing "." indicates the build context (Dockerfile location).',
        },
        examples: { ja: 'docker build -t myapp .\ndocker build -t myapp:v1 .\ndocker build -f Dockerfile.prod -t myapp:prod .', en: 'docker build -t myapp .\ndocker build -t myapp:v1 .\ndocker build -f Dockerfile.prod -t myapp:prod .' },
        relatedTerms: ['dockerfile', 'opt-t', 'opt-f', 'layer', 'build-cache'],
    },
    {
        id: 'docker-images',
        term: { ja: 'docker images', en: 'docker images' },
        mainCategory: 'command', subCategory: 'main-command', group: 'image-ops', firstChapterId: 7,
        summary: { ja: 'ローカルのイメージ一覧を表示', en: 'List local images' },
        description: { ja: 'ローカルに保存されているDockerイメージの一覧を表示する。イメージ名、タグ、サイズ等が確認できる。', en: 'Lists Docker images stored locally. Shows image name, tag, size, etc.' },
        examples: { ja: 'docker images\ndocker images myapp', en: 'docker images\ndocker images myapp' },
        relatedTerms: ['image', 'tag'],
    },
    {
        id: 'docker-history',
        term: { ja: 'docker history', en: 'docker history' },
        mainCategory: 'command', subCategory: 'main-command', group: 'image-ops', firstChapterId: 8,
        summary: { ja: 'イメージのレイヤー履歴を表示', en: 'Display image layer history' },
        description: { ja: 'イメージがどのような命令で構築されたかをレイヤーごとに表示する。各レイヤーのサイズも確認できる。', en: 'Shows how an image was built, layer by layer. Also shows the size of each layer.' },
        examples: { ja: 'docker history myapp\ndocker history nginx', en: 'docker history myapp\ndocker history nginx' },
        relatedTerms: ['layer', 'image'],
    },

    // ═══════════════════════════════════════
    // 💻 コマンド > オプション
    // ═══════════════════════════════════════

    {
        id: 'opt-d',
        term: { ja: '-d (detach)', en: '-d (detach)' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 3,
        summary: { ja: 'コンテナをバックグラウンドで実行', en: 'Run container in background' },
        description: { ja: 'コンテナをデタッチモード（バックグラウンド）で実行する。ターミナルを占有せず、コンテナIDが返される。', en: 'Runs the container in detached mode (background). Frees the terminal and returns the container ID.' },
        examples: { ja: 'docker run -d nginx', en: 'docker run -d nginx' },
        relatedTerms: ['docker-run'],
    },
    {
        id: 'opt-it',
        term: { ja: '-it (interactive + TTY)', en: '-it (interactive + TTY)' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 4,
        summary: { ja: 'コンテナに対話モードで接続', en: 'Connect to container in interactive mode' },
        description: { ja: '-i (stdin を開く) と -t (仮想端末を割り当て) を組み合わせ、コンテナの中にターミナルを開く。コンテナ内でシェル操作が可能になる。', en: 'Combines -i (keep stdin open) and -t (allocate pseudo-TTY) to open a terminal inside the container. Enables shell operations inside the container.' },
        examples: { ja: 'docker run -it ubuntu bash\ndocker exec -it <ID> bash', en: 'docker run -it ubuntu bash\ndocker exec -it <ID> bash' },
        relatedTerms: ['docker-run', 'docker-exec'],
    },
    {
        id: 'opt-p',
        term: { ja: '-p (port)', en: '-p (port)' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 5,
        summary: { ja: 'ホスト:コンテナのポートマッピング', en: 'Host:container port mapping' },
        description: { ja: 'ホストのポートとコンテナのポートを接続する。形式は -p <ホスト側>:<コンテナ側>。', en: 'Connects host port to container port. Format: -p <host>:<container>.' },
        examples: { ja: 'docker run -p 8080:80 nginx\ndocker run -p 3000:3000 myapp', en: 'docker run -p 8080:80 nginx\ndocker run -p 3000:3000 myapp' },
        relatedTerms: ['port-mapping', 'docker-run'],
    },
    {
        id: 'opt-v',
        term: { ja: '-v (volume)', en: '-v (volume)' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 6,
        summary: { ja: 'ボリュームまたはバインドマウントを設定', en: 'Set volume or bind mount' },
        description: { ja: 'ボリュームまたはバインドマウントを指定する。名前付きの場合はボリューム、パス指定の場合はバインドマウントになる。', en: 'Specifies a volume or bind mount. Named references create volumes; path references create bind mounts.' },
        examples: { ja: 'docker run -v mydata:/data nginx     # ボリューム\ndocker run -v $(pwd):/app nginx       # バインドマウント', en: 'docker run -v mydata:/data nginx     # Volume\ndocker run -v $(pwd):/app nginx       # Bind mount' },
        relatedTerms: ['volume', 'bind-mount', 'docker-run'],
    },
    {
        id: 'opt-a',
        term: { ja: '-a (all)', en: '-a (all)' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 2,
        summary: { ja: 'docker ps で停止中のコンテナも表示', en: 'Show stopped containers with docker ps' },
        description: { ja: 'docker ps コマンドと組み合わせ、停止中のコンテナも含めた全コンテナを表示する。', en: 'Combined with docker ps to show all containers including stopped ones.' },
        examples: { ja: 'docker ps -a', en: 'docker ps -a' },
        relatedTerms: ['docker-ps'],
    },
    {
        id: 'opt-name',
        term: { ja: '--name', en: '--name' },
        mainCategory: 'command', subCategory: 'option', group: 'run-options', firstChapterId: 3,
        summary: { ja: 'コンテナに名前を付ける', en: 'Assign a name to a container' },
        description: { ja: 'コンテナに分かりやすい名前を付ける。名前を付けるとIDの代わりに名前で操作できる。', en: 'Gives a human-readable name to a container. Named containers can be managed by name instead of ID.' },
        examples: { ja: 'docker run -d --name my_web nginx\ndocker stop my_web', en: 'docker run -d --name my_web nginx\ndocker stop my_web' },
        relatedTerms: ['docker-run'],
    },
    {
        id: 'opt-t',
        term: { ja: '-t (tag)', en: '-t (tag)' },
        mainCategory: 'command', subCategory: 'option', group: 'build-options', firstChapterId: 7,
        summary: { ja: 'docker build時にイメージ名:タグを指定', en: 'Specify image name:tag during docker build' },
        description: { ja: 'docker build でイメージをビルドする際に名前とタグを指定する。', en: 'Specifies the name and tag when building an image with docker build.' },
        examples: { ja: 'docker build -t myapp .\ndocker build -t myapp:v2 .', en: 'docker build -t myapp .\ndocker build -t myapp:v2 .' },
        relatedTerms: ['docker-build', 'tag'],
    },
    {
        id: 'opt-f',
        term: { ja: '-f (file)', en: '-f (file)' },
        mainCategory: 'command', subCategory: 'option', group: 'build-options', firstChapterId: 9,
        summary: { ja: '使用するDockerfileを指定', en: 'Specify which Dockerfile to use' },
        description: { ja: 'デフォルト以外のDockerfileを指定してビルドする。マルチステージビルド等で別ファイルを使う場合に有用。', en: 'Build using a non-default Dockerfile. Useful for multi-stage builds or alternative Dockerfiles.' },
        examples: { ja: 'docker build -f Dockerfile.prod -t myapp:prod .', en: 'docker build -f Dockerfile.prod -t myapp:prod .' },
        relatedTerms: ['docker-build', 'dockerfile'],
    },
];
