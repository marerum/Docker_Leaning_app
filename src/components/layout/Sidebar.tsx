'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { chapters } from '@/lib/content/chapters';
import { practiceExercises, WIP_EXERCISES, PRACTICE_LEVEL_LABELS } from '@/lib/content/practices';
import styles from './Sidebar.module.css';

interface SidebarProps {
    streak: number;
    isOpen: boolean;
    onClose: () => void;
}

const LEVEL_LABELS = {
    ja: ['Docker 基礎', 'Dockerfile & イメージ', 'Docker Compose', '実践・運用スキル（工事中）', 'CI/CD・チーム開発（工事中）'],
    en: ['Docker Basics', 'Dockerfile & Images', 'Docker Compose', 'Practice & Operations (WIP)', 'CI/CD & Team Dev (WIP)'],
};

export default function Sidebar({ streak, isOpen, onClose }: SidebarProps) {
    const { t, locale } = useI18n();
    const pathname = usePathname();
    const router = useRouter();
    const [dictSearch, setDictSearch] = useState('');

    // Determine which section is active
    const isGuideActive = pathname === '/guide' || pathname?.startsWith('/guide/');
    const isPracticeActive = pathname === '/practice' || pathname?.startsWith('/practice/');
    const isDictionaryActive = pathname === '/dictionary';
    const isChallengeActive = pathname === '/challenge';
    const isProgressActive = pathname === '/progress';

    // Track which nav sections are expanded (auto-expand active section)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        guide: isGuideActive,
        practice: isPracticeActive,
    });

    useEffect(() => {
        if (isGuideActive) setExpanded(prev => ({ ...prev, guide: true }));
    }, [isGuideActive]);

    useEffect(() => {
        if (isPracticeActive) setExpanded(prev => ({ ...prev, practice: true }));
    }, [isPracticeActive]);

    // ページ遷移時にモバイルSidebarを閉じる
    useEffect(() => {
        onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const toggleSection = (key: string) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const currentChapterId = pathname?.startsWith('/guide/')
        ? Number(pathname.split('/').pop())
        : null;

    const currentExerciseId = pathname?.startsWith('/practice/')
        ? pathname.split('/').pop()
        : null;

    // Group chapters by level
    const chaptersByLevel = [1, 2, 3, 4, 5].map(level => ({
        level,
        label: LEVEL_LABELS[locale][level - 1],
        chapters: chapters.filter(c => c.level === level),
    }));

    // Group practice exercises by level
    const practiceByLevel = [0, 1].map(level => ({
        level,
        label: PRACTICE_LEVEL_LABELS.implemented[level][locale],
        exercises: practiceExercises.filter(e => e.level === level),
    }));

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
            aria-hidden={!isOpen ? true : undefined}
        >
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

                {/* ─── 演習 (collapsible) ─── */}
                <div className={styles.navSection}>
                    <button
                        className={`${styles.navItem} ${isPracticeActive ? styles.navItemActive : ''}`}
                        onClick={() => toggleSection('practice')}
                    >
                        <span className={styles.navIcon}>💻</span>
                        <span className={styles.navLabel}>{t.nav.practice}</span>
                        <span className={`${styles.chevron} ${expanded.practice ? styles.chevronOpen : ''}`}>▸</span>
                    </button>

                    {expanded.practice && (
                        <div className={styles.subNav}>
                            <Link
                                href="/practice"
                                className={`${styles.subNavTop} ${pathname === '/practice' ? styles.subNavTopActive : ''}`}
                            >
                                {locale === 'ja' ? '📑 演習一覧' : '📑 Exercise List'}
                            </Link>
                            {practiceByLevel.map(({ level, label, exercises }) => (
                                <div key={level} className={styles.levelGroup}>
                                    <div className={styles.levelLabel}>
                                        <span className={styles.levelBadge}>Lv.{level}</span>
                                        <span>{label}</span>
                                    </div>
                                    {exercises.map((ex) => {
                                        const isCurrent = currentExerciseId === ex.id;
                                        return (
                                            <Link
                                                key={ex.id}
                                                href={`/practice/${ex.id}`}
                                                className={`${styles.chapterItem} ${isCurrent ? styles.chapterItemActive : ''}`}
                                            >
                                                <span className={styles.chapterIcon}>{ex.icon}</span>
                                                <span className={styles.chapterName}>{ex.title[locale]}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                            {/* WIP levels */}
                            {WIP_EXERCISES.map(wl => (
                                <div key={wl.levelLabel} className={styles.levelGroup}>
                                    <div className={styles.levelLabel}>
                                        <span className={styles.levelBadge} style={{ opacity: 0.5 }}>{wl.levelLabel}</span>
                                        <span style={{ opacity: 0.5 }}>
                                            {PRACTICE_LEVEL_LABELS.wip[WIP_EXERCISES.indexOf(wl)][locale]}
                                        </span>
                                        <span style={{ fontSize: '0.65rem', color: '#f0a040', marginLeft: '4px' }}>
                                            {locale === 'ja' ? '（工事中）' : '(WIP)'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                    <div style={{ padding: '0 var(--space-4) var(--space-2)' }}>
                        <input
                            type="text"
                            value={dictSearch}
                            onChange={(e) => setDictSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && dictSearch.trim()) {
                                    router.push(`/dictionary?q=${encodeURIComponent(dictSearch.trim())}`);
                                }
                            }}
                            placeholder={locale === 'ja' ? '🔍 用語を検索...' : '🔍 Search...'}
                            style={{
                                width: '100%',
                                padding: '5px 10px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.75rem',
                                outline: 'none',
                            }}
                        />
                    </div>
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
                <Link href="/disclaimer" className={styles.privacyLink}>
                    {locale === 'ja' ? '⚠️ 免責事項（β版）' : '⚠️ Disclaimer (β)'}
                </Link>
                <Link href="/privacy" className={styles.privacyLink}>
                    {locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
                </Link>
            </div>
        </aside>
    );
}
