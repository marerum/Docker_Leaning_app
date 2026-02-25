// Data Access Layer - Abstracted for future migration
// MVP: LocalStorage | Future: API + PostgreSQL + Stripe

// ---------- Types ----------
export interface ChapterProgress {
    chapterId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    sectionsCompleted: string[];
    xpEarned: number;
    completedAt?: string;
}

export interface Badge {
    id: string;
    slug: string;
    earnedAt: string;
}

export interface UserProfile {
    level: number;
    xp: number;
    totalXP: number;
    streak: number;
    lastActiveDate: string;
    locale: 'ja' | 'en';
    os: 'windows' | 'mac';
}

// ---------- Interface ----------
export interface UserProgressStore {
    getProfile(): Promise<UserProfile>;
    saveProfile(profile: Partial<UserProfile>): Promise<void>;
    getProgress(chapterId: string): Promise<ChapterProgress>;
    getAllProgress(): Promise<Record<string, ChapterProgress>>;
    saveProgress(chapterId: string, progress: ChapterProgress): Promise<void>;
    getXP(): Promise<number>;
    addXP(amount: number): Promise<{ newXP: number; leveledUp: boolean; newLevel: number }>;
    getBadges(): Promise<Badge[]>;
    unlockBadge(badgeId: string): Promise<Badge>;
    getStreak(): Promise<number>;
    recordActivity(): Promise<number>;
}

// ---------- XP / Level Calculation ----------
export const XP_TABLE = {
    introRead: 5,
    conceptRead: 10,
    simulationSuccess: 20,
    localPractice: 30,
    checkpointCorrect: 30,
    chapterComplete: 100,
    dailyChallenge: 50,
    questComplete: 200,
};

export const LEVEL_THRESHOLDS = [
    0, 100, 220, 360, 520, 700,      // Lv 1-5: コンテナビギナー
    900, 1120, 1360, 1620, 1900,      // Lv 6-10: アプレンティス
    2200, 2520, 2860, 3220, 3600,     // Lv 11-15: セーラー
    4000, 4420, 4860, 5320, 5800,     // Lv 16-20: アーキテクト
    6300, 6820, 7360, 7920, 8500,     // Lv 21-25: マエストロ
    9100, 9720, 10360, 11020, 11700,  // Lv 26-30: マスター
];

export function calculateLevel(xp: number): number {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
}

export function xpForNextLevel(xp: number): { current: number; needed: number; progress: number } {
    const level = calculateLevel(xp);
    const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const current = xp - currentThreshold;
    const needed = nextThreshold - currentThreshold;
    return { current, needed, progress: Math.min(current / needed, 1) };
}

export function getLevelTitle(level: number, locale: 'ja' | 'en' = 'ja'): string {
    const titles: Record<string, [string, string]> = {
        beginner: ['🐣 コンテナビギナー', '🐣 Container Beginner'],
        apprentice: ['🐋 ドッカーアプレンティス', '🐋 Docker Apprentice'],
        sailor: ['⚓ コンテナセーラー', '⚓ Container Sailor'],
        architect: ['🏗️ イメージアーキテクト', '🏗️ Image Architect'],
        maestro: ['🎼 コンポーズマエストロ', '🎼 Compose Maestro'],
        master: ['🐳 ドッカーマスター', '🐳 Docker Master'],
    };
    const idx = locale === 'ja' ? 0 : 1;
    if (level <= 5) return titles.beginner[idx];
    if (level <= 10) return titles.apprentice[idx];
    if (level <= 15) return titles.sailor[idx];
    if (level <= 20) return titles.architect[idx];
    if (level <= 25) return titles.maestro[idx];
    return titles.master[idx];
}

// ---------- LocalStorage Implementation ----------
const STORAGE_PREFIX = 'dq-';

function getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(STORAGE_PREFIX + key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function setItem(key: string, value: unknown): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

const DEFAULT_PROFILE: UserProfile = {
    level: 1,
    xp: 0,
    totalXP: 0,
    streak: 0,
    lastActiveDate: '',
    locale: 'ja',
    os: 'windows',
};

export class LocalStorageStore implements UserProgressStore {
    async getProfile(): Promise<UserProfile> {
        return getItem<UserProfile>('profile', DEFAULT_PROFILE);
    }

    async saveProfile(partial: Partial<UserProfile>): Promise<void> {
        const current = await this.getProfile();
        setItem('profile', { ...current, ...partial });
    }

    async getProgress(chapterId: string): Promise<ChapterProgress> {
        const all = await this.getAllProgress();
        return all[chapterId] || {
            chapterId,
            status: 'not_started',
            sectionsCompleted: [],
            xpEarned: 0,
        };
    }

    async getAllProgress(): Promise<Record<string, ChapterProgress>> {
        return getItem<Record<string, ChapterProgress>>('progress', {});
    }

    async saveProgress(chapterId: string, progress: ChapterProgress): Promise<void> {
        const all = await this.getAllProgress();
        all[chapterId] = progress;
        setItem('progress', all);
    }

    async getXP(): Promise<number> {
        const profile = await this.getProfile();
        return profile.totalXP;
    }

    async addXP(amount: number): Promise<{ newXP: number; leveledUp: boolean; newLevel: number }> {
        const profile = await this.getProfile();
        const oldLevel = profile.level;
        const newXP = profile.totalXP + amount;
        const newLevel = calculateLevel(newXP);
        await this.saveProfile({ totalXP: newXP, xp: newXP, level: newLevel });
        return { newXP, leveledUp: newLevel > oldLevel, newLevel };
    }

    async getBadges(): Promise<Badge[]> {
        return getItem<Badge[]>('badges', []);
    }

    async unlockBadge(badgeId: string): Promise<Badge> {
        const badges = await this.getBadges();
        const existing = badges.find(b => b.id === badgeId);
        if (existing) return existing;
        const badge: Badge = { id: badgeId, slug: badgeId, earnedAt: new Date().toISOString() };
        badges.push(badge);
        setItem('badges', badges);
        return badge;
    }

    async getStreak(): Promise<number> {
        const profile = await this.getProfile();
        return profile.streak;
    }

    async recordActivity(): Promise<number> {
        const profile = await this.getProfile();
        const today = new Date().toISOString().split('T')[0];
        const lastDate = profile.lastActiveDate;

        let streak = profile.streak;
        if (lastDate === today) {
            return streak; // Already recorded today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
            streak += 1;
        } else {
            streak = 1;
        }

        await this.saveProfile({ streak, lastActiveDate: today });
        return streak;
    }
}

// Singleton store instance
let storeInstance: UserProgressStore | null = null;

export function getStore(): UserProgressStore {
    if (!storeInstance) {
        storeInstance = new LocalStorageStore();
    }
    return storeInstance;
}
