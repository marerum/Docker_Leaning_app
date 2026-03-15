'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import {
    getStore,
    getLevelTitle,
    xpForNextLevel,
    type UserProfile,
    type ChapterProgress,
} from '@/lib/store';
import { chapters } from '@/lib/content/chapters';
import styles from './progress.module.css';

const LEVEL_NAMES: Record<'ja' | 'en', string[]> = {
    ja: ['Docker 基礎', 'Dockerfile & イメージ', 'Docker Compose', '実践・運用スキル', 'CI/CD・チーム開発'],
    en: ['Docker Basics', 'Dockerfile & Images', 'Docker Compose', 'Operations & Debugging', 'CI/CD & Team Dev'],
};

export default function ProgressPage() {
    const { locale } = useI18n();
    const lang = locale === 'en' ? 'en' : 'ja';

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [allProgress, setAllProgress] = useState<Record<string, ChapterProgress>>({});
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        const store = getStore();
        Promise.all([
            store.getProfile(),
            store.getAllProgress(),
            store.getBadges(),
        ]).then(([p, prog, badges]) => {
            setProfile(p);
            setAllProgress(prog);
            setBadgeCount(badges.length);
        });
    }, []);

    if (!profile) return null;

    const { current, needed, progress: xpProgress } = xpForNextLevel(profile.totalXP);
    const levelTitle = getLevelTitle(profile.level, lang);

    const completedIds = new Set(
        Object.values(allProgress)
            .filter(p => p.status === 'completed')
            .map(p => p.chapterId)
    );
    const totalChapters = chapters.length;
    const completedCount = chapters.filter(ch => completedIds.has(String(ch.id))).length;
    const overallPct = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

    const byLevel = [1, 2, 3, 4, 5].map(lv => {
        const lvChapters = chapters.filter(ch => ch.level === lv);
        const done = lvChapters.filter(ch => completedIds.has(String(ch.id))).length;
        return { level: lv, chapters: lvChapters, done };
    });

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    📊 {lang === 'ja' ? '進捗ダッシュボード' : 'Progress Dashboard'}
                </h1>
                <p className={styles.pageDesc}>
                    {lang === 'ja' ? '学習の進み具合を確認しよう' : 'Check your learning progress'}
                </p>
            </div>

            {/* Stats Card */}
            <div className={styles.statsCard}>
                <div className={styles.levelInfo}>
                    <span className={styles.levelLabel}>Lv.{profile.level}</span>
                    <span className={styles.levelTitle}>{levelTitle}</span>
                </div>
                <div className={styles.xpRow}>
                    <div className={styles.xpTrack}>
                        <div className={styles.xpFill} style={{ width: `${xpProgress * 100}%` }} />
                    </div>
                    <span className={styles.xpText}>{current.toLocaleString()} / {needed.toLocaleString()} XP</span>
                </div>
                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <span>🔥</span>
                        <span>{profile.streak}{lang === 'ja' ? '日連続' : '-day streak'}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span>🏆</span>
                        <span>{badgeCount}{lang === 'ja' ? ' バッジ' : ' badges'}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span>⭐</span>
                        <span>{profile.totalXP.toLocaleString()} XP {lang === 'ja' ? '獲得' : 'earned'}</span>
                    </div>
                </div>
            </div>

            {/* Overall Progress */}
            <div className={styles.overallCard}>
                <div className={styles.overallHeader}>
                    <span className={styles.overallLabel}>
                        {lang === 'ja' ? '全体進捗' : 'Overall Progress'}
                    </span>
                    <span className={styles.overallCount}>
                        {completedCount} / {totalChapters} {lang === 'ja' ? '章' : 'chapters'} ({overallPct}%)
                    </span>
                </div>
                <div className={styles.overallTrack}>
                    <div className={styles.overallFill} style={{ width: `${overallPct}%` }} />
                </div>
            </div>

            {/* Level Cards */}
            <div className={styles.levelGrid}>
                {byLevel.map(({ level, chapters: lvChapters, done }) => {
                    const pct = lvChapters.length > 0 ? Math.round((done / lvChapters.length) * 100) : 0;
                    const isComplete = done === lvChapters.length && lvChapters.length > 0;
                    const isStarted = done > 0;
                    return (
                        <div key={level} className={`${styles.levelCard} ${isComplete ? styles.levelCardComplete : ''}`}>
                            <div className={styles.levelCardHeader}>
                                <span className={styles.levelCardBadge}>Lv.{level}</span>
                                <span className={styles.levelCardName}>{LEVEL_NAMES[lang][level - 1]}</span>
                            </div>
                            <div className={styles.levelCardTrack}>
                                <div className={styles.levelCardFill} style={{ width: `${pct}%` }} />
                            </div>
                            <div className={styles.levelCardStats}>
                                <span>{done}/{lvChapters.length}</span>
                                <span className={
                                    isComplete ? styles.completeBadge
                                    : isStarted ? styles.inProgressBadge
                                    : styles.notStartedBadge
                                }>
                                    {isComplete
                                        ? (lang === 'ja' ? '✅ 完了' : '✅ Done')
                                        : isStarted
                                        ? (lang === 'ja' ? '🔵 進行中' : '🔵 In Progress')
                                        : (lang === 'ja' ? '⬜ 未着手' : '⬜ Not Started')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chapter List by Level */}
            {byLevel.map(({ level, chapters: lvChapters }) => (
                <div key={level} className={styles.levelSection}>
                    <div className={styles.levelSectionHeader}>
                        <span className={styles.levelSectionBadge}>Lv.{level}</span>
                        <span className={styles.levelSectionName}>{LEVEL_NAMES[lang][level - 1]}</span>
                    </div>
                    <div className={styles.chapterList}>
                        {lvChapters.map(ch => {
                            const prog = allProgress[String(ch.id)];
                            const status = prog?.status ?? 'not_started';
                            const statusIcon =
                                status === 'completed' ? '✅'
                                : status === 'in_progress' ? '🔵'
                                : '⬜';
                            return (
                                <Link key={ch.id} href={`/guide/${ch.id}`} className={styles.chapterRow}>
                                    <span className={styles.chapterStatus}>{statusIcon}</span>
                                    <span className={styles.chapterIcon}>{ch.icon}</span>
                                    <span className={styles.chapterName}>
                                        Ch.{ch.id} {ch.title[lang]}
                                    </span>
                                    {prog?.xpEarned ? (
                                        <span className={styles.chapterXP}>+{prog.xpEarned} XP</span>
                                    ) : null}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
