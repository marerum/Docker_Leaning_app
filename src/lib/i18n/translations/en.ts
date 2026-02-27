const en = {
    common: {
        appName: 'Docker Quest',
        loading: 'Loading...',
        next: 'Next',
        prev: 'Previous',
        start: 'Start',
        complete: 'Complete',
        copy: 'Copy',
        copied: 'Copied!',
        tryIt: 'Try it',
        close: 'Close',
    },

    nav: {
        guide: 'Main Curriculum',
        practice: 'Practice',
        dictionary: 'Dictionary',
        challenge: 'Challenge',
        progress: 'Progress',
    },

    header: {
        level: 'Lv.',
        switchLang: 'Language',
        switchOS: 'OS',
    },

    os: {
        windows: {
            name: 'Windows',
            terminal: 'PowerShell',
            installTitle: 'Install Docker Desktop for Windows',
            installSteps: [
                'Download Docker Desktop for Windows',
                'Run the installer',
                'Enable WSL 2 backend (recommended)',
                'Restart your PC',
                'Launch Docker Desktop',
            ],
            pathExample: 'C:\\Users\\username\\project',
            shellPrompt: 'PS C:\\>',
        },
        mac: {
            name: 'macOS',
            terminal: 'Terminal',
            installTitle: 'Install Docker Desktop for Mac',
            installSteps: [
                'Download Docker Desktop for Mac (Intel / Apple Silicon)',
                'Open the .dmg and drag Docker to Applications',
                'Launch Docker Desktop',
                'Approve security permissions',
            ],
            pathExample: '~/project',
            shellPrompt: '$ ',
        },
    },

    guide: {
        intro: 'Chapter Overview',
        why: 'Why Learn This',
        goal: 'Chapter Goals',
        concept: 'Concept',
        simulation: 'Practice with Simulation',
        localPractice: 'Practice with Local Docker',
        localPracticeDesc: 'Try it on your own PC!',
        checkpoint: 'Checkpoint',
        chapterComplete: '🏆 Chapter Complete!',
        beforeAfter: {
            before: 'Before (The Problem)',
            after: 'After (Solved with Docker)',
        },
    },

    terminal: {
        title: 'Simulation Terminal',
        placeholder: 'Type a command...',
        hint: 'Hint',
        success: '✅ Correct!',
        tryAgain: 'Almost! Check the hint',
        error: 'Command not found',
        reset: 'Reset',
    },

    progress: {
        title: 'Progress Dashboard',
        overallProgress: 'Overall Progress',
        xpLabel: 'XP',
        level: 'Level',
        streak: 'Learning Streak',
        days: 'days',
        badges: 'Badges',
        skills: 'Skills',
    },

    dictionary: {
        title: 'Command Dictionary',
        search: 'Search commands...',
        syntax: 'Syntax',
        options: 'Options',
        examples: 'Examples',
        notes: 'Notes',
        categories: {
            container: 'Container',
            image: 'Image',
            volume: 'Volume',
            network: 'Network',
            compose: 'Compose',
        },
    },

    gamification: {
        levelUp: 'Level Up!',
        badgeEarned: 'Badge Earned!',
        xpGained: 'XP Gained',
        streakBonus: 'Streak Bonus',
    },

    levels: {
        titles: {
            beginner: 'Container Beginner',
            apprentice: 'Docker Apprentice',
            sailor: 'Container Sailor',
            architect: 'Image Architect',
            maestro: 'Compose Maestro',
            master: 'Docker Master',
        },
    },

    curriculum: {
        level1: {
            title: 'Docker Basics',
            description: 'Your first step into the container world',
        },
        level2: {
            title: 'Dockerfile & Images',
            description: 'Build your own images',
        },
        level3: {
            title: 'Docker Compose Intro',
            description: 'Orchestrate multiple services',
        },
    },
};

export default en;
