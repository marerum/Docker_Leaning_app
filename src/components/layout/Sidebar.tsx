'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { chapters } from '@/lib/content/chapters';
import styles from './Sidebar.module.css';

interface SidebarProps {
    streak: number;
}

const LEVEL_LABELS = {
    ja: ['Docker 基礎', 'Dockerfile & イメージ', 'Docker Compose', '実践・運用スキル（工事中）', 'CI/CD・チーム開発（工事中）'],
    en: ['Docker Basics', 'Dockerfile & Images', 'Docker Compose', 'Practice & Operations (WIP)', 'CI/CD & Team Dev (WIP)'],
};

export default function Sidebar({ streak }: SidebarProps) {
    const { t, locale } = useI18n();
    const pathname = usePathname();

    // Determine which section is active
    const isGuideActive = pathname === '/guide' || pathname?.startsWith('/guide/');
    const isPracticeActive = pathname === '/practice';
    const isDictionaryActive = pathname === '/dictionary';
    const isChallengeActive = pathname === '/challenge';
    const isProgressActive = pathname === '/progress';

    // Track which nav sections are expanded (auto-expand active section)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        guide: isGuideActive,
    });

    useEffect(() => {
        if (isGuideActive) setExpanded(prev => ({ ...prev, guide: true }));
    }, [isGuideActive]);

    const toggleSection = (key: string) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const currentChapterId = pathname?.startsWith('/guide/')
        ? Number(pathname.split('/').pop())
        : null;

    // Group chapters by level
    const chaptersByLevel = [1, 2, 3, 4, 5].map(level => ({
        level,
        label: LEVEL_LABELS[locale][level - 1],
        chapters: chapters.filter(c => c.level === level),
    }));

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.sidebarLogo}>
                <span className={styles.sidebarLogoIcon}>🐳</span>
                <span className={styles.sidebarLogoText}>{t.common.appName}</span>
            </Link>

            <nav className={styles.nav}>
                {/* ─── ガイド (collapsible) ─── */}
                <div className={styles.navSection}>
                    <button
                        className={`${styles.navItem} ${isGuideActive ? styles.navItemActive : ''}`}
                        onClick={() => toggleSection('guide')}
                    >
                        <span className={styles.navIcon}>📖</span>
                        <span className={styles.navLabel}>{t.nav.guide}</span>
                        <span className={`${styles.chevron} ${expanded.guide ? styles.chevronOpen : ''}`}>▸</span>
                    </button>

                    {expanded.guide && (
                        <div className={styles.subNav}>
                            <Link
                                href="/guide"
                                className={`${styles.subNavTop} ${pathname === '/guide' ? styles.subNavTopActive : ''}`}
                            >
                                {locale === 'ja' ? '📑 カリキュラム一覧' : '📑 Curriculum'}
                            </Link>
                            {chaptersByLevel.map(({ level, label, chapters: lvlChapters }) => (
                                <div key={level} className={styles.levelGroup}>
                                    <div className={styles.levelLabel}>
                                        <span className={styles.levelBadge}>Lv.{level}</span>
                                        <span>{label}</span>
                                    </div>
                                    {lvlChapters.map((ch) => {
                                        const isCurrentChapter = currentChapterId === ch.id;
                                        return (
                                            <Link
                                                key={ch.id}
                                                href={`/guide/${ch.id}`}
                                                className={`${styles.chapterItem} ${isCurrentChapter ? styles.chapterItemActive : ''}`}
                                            >
                                                <span className={styles.chapterIcon}>{ch.icon}</span>
                                                <span className={styles.chapterName}>{ch.title[locale]}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── 演習 ─── */}
                <div className={styles.navSection}>
                    <Link
                        href="/practice"
                        className={`${styles.navItem} ${isPracticeActive ? styles.navItemActive : ''}`}
                    >
                        <span className={styles.navIcon}>💻</span>
                        <span className={styles.navLabel}>{t.nav.practice}</span>
                    </Link>
                </div>

                {/* ─── 辞書 ─── */}
                <div className={styles.navSection}>
                    <Link
                        href="/dictionary"
                        className={`${styles.navItem} ${isDictionaryActive ? styles.navItemActive : ''}`}
                    >
                        <span className={styles.navIcon}>📚</span>
                        <span className={styles.navLabel}>{t.nav.dictionary}</span>
                    </Link>
                </div>

                {/* ─── チャレンジ ─── */}
                <div className={styles.navSection}>
                    <Link
                        href="/challenge"
                        className={`${styles.navItem} ${isChallengeActive ? styles.navItemActive : ''}`}
                    >
                        <span className={styles.navIcon}>🎮</span>
                        <span className={styles.navLabel}>{t.nav.challenge}</span>
                    </Link>
                </div>

                {/* ─── 進捗 ─── */}
                <div className={styles.navSection}>
                    <Link
                        href="/progress"
                        className={`${styles.navItem} ${isProgressActive ? styles.navItemActive : ''}`}
                    >
                        <span className={styles.navIcon}>📊</span>
                        <span className={styles.navLabel}>{t.nav.progress}</span>
                    </Link>
                </div>
            </nav>

            <div className={styles.sidebarFooter}>
                {streak > 0 && (
                    <div className={styles.streakBadge}>
                        <span>🔥</span>
                        <span>{streak}{t.progress.days}</span>
                    </div>
                )}
            </div>
        </aside>
    );
}
