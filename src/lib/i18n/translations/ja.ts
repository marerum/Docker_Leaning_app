const ja = {
  // Common
  common: {
    appName: 'Docker Quest',
    loading: '読み込み中...',
    next: '次へ',
    prev: '前へ',
    start: 'はじめる',
    complete: '完了',
    copy: 'コピー',
    copied: 'コピーしました！',
    tryIt: '試してみる',
    close: '閉じる',
  },

  // Navigation
  nav: {
    guide: 'メインカリキュラム',
    practice: '演習',
    dictionary: '辞書',
    challenge: 'チャレンジ',
    progress: '進捗',
  },

  // Header
  header: {
    level: 'Lv.',
    switchLang: '言語切替',
    switchOS: 'OS切替',
  },

  // OS-specific
  os: {
    windows: {
      name: 'Windows',
      terminal: 'PowerShell',
      installTitle: 'Docker Desktop for Windows のインストール',
      installSteps: [
        'Docker Desktop for Windows をダウンロード',
        'インストーラーを実行',
        'WSL 2 バックエンドを有効化（推奨）',
        'PCを再起動',
        'Docker Desktop を起動',
      ],
      pathExample: 'C:\\Users\\username\\project',
      shellPrompt: 'PS C:\\>',
    },
    mac: {
      name: 'macOS',
      terminal: 'Terminal',
      installTitle: 'Docker Desktop for Mac のインストール',
      installSteps: [
        'Docker Desktop for Mac をダウンロード（Intel / Apple Silicon）',
        '.dmg ファイルを開き Docker をApplicationsにドラッグ',
        'Docker Desktop を起動',
        'セキュリティ許可を承認',
      ],
      pathExample: '~/project',
      shellPrompt: '$ ',
    },
  },

  // Guide
  guide: {
    intro: 'この章の全体像',
    why: 'なぜこれを学ぶのか',
    goal: 'この章のゴール',
    concept: 'コンセプト解説',
    simulation: 'シミュレーションで練習',
    localPractice: 'ローカルDockerで実践',
    localPracticeDesc: '自分のPCでも試してみましょう！',
    checkpoint: 'チェックポイント',
    chapterComplete: '🏆 章クリア！',
    beforeAfter: {
      before: 'Before（この課題）',
      after: 'After（Dockerで解決）',
    },
  },

  // Terminal
  terminal: {
    title: 'シミュレーションターミナル',
    placeholder: 'コマンドを入力してください...',
    hint: 'ヒント',
    success: '✅ 正解！',
    tryAgain: 'もう少し！ヒントを確認してみましょう',
    error: 'コマンドが見つかりません',
    reset: 'リセット',
  },

  // Progress
  progress: {
    title: '進捗ダッシュボード',
    overallProgress: '全体の進捗',
    xpLabel: 'XP',
    level: 'レベル',
    streak: '連続学習',
    days: '日',
    badges: 'バッジ',
    skills: 'スキル',
  },

  // Dictionary
  dictionary: {
    title: 'コマンド辞書',
    search: 'コマンドを検索...',
    syntax: '構文',
    options: 'オプション',
    examples: '使用例',
    notes: '注意点',
    categories: {
      container: 'コンテナ',
      image: 'イメージ',
      volume: 'ボリューム',
      network: 'ネットワーク',
      compose: 'Compose',
    },
  },

  // Gamification
  gamification: {
    levelUp: 'レベルアップ！',
    badgeEarned: 'バッジ獲得！',
    xpGained: 'XP獲得',
    streakBonus: '連続学習ボーナス',
  },

  // Levels
  levels: {
    titles: {
      beginner: 'コンテナビギナー',
      apprentice: 'ドッカーアプレンティス',
      sailor: 'コンテナセーラー',
      architect: 'イメージアーキテクト',
      maestro: 'コンポーズマエストロ',
      master: 'ドッカーマスター',
    },
  },

  // Curriculum
  curriculum: {
    level1: {
      title: 'Docker 基礎',
      description: 'コンテナの世界への第一歩',
    },
    level2: {
      title: 'Dockerfile & イメージ',
      description: '自分だけのイメージを作ろう',
    },
    level3: {
      title: 'Docker Compose',
      description: '複数サービスを指揮しよう',
    },
    level4: {
      title: '実践・運用スキル',
      description: 'デバッグ・セキュリティ・Docker Hub',
    },
    level5: {
      title: 'CI/CD・チーム開発',
      description: '自動化と本番デプロイ',
    },
  },
};

// Recursive type for nested translation objects
type DeepStringRecord = {
  [key: string]: string | string[] | DeepStringRecord;
};

export type TranslationKeys = typeof ja & DeepStringRecord;
export default ja;
