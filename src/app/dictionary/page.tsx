'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import {
    dictionaryEntries,
    DictionaryEntry,
    DictMainCategory,
    DictSubCategory,
    MAIN_CATEGORY_LABELS,
    SUB_CATEGORY_LABELS,
    GROUP_LABELS,
} from '@/lib/content/dictionary';
import { chapters } from '@/lib/content/chapters';
import styles from './dictionary.module.css';

type Locale = 'ja' | 'en';
type ViewMode = 'category' | 'alpha';

export default function DictionaryPage() {
    const { locale, t } = useI18n();
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<ViewMode>('category');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({
        'basic': true, 'dockerfile': true, 'dockerfile-cmd': true,
        'docker-image': true, 'main-command': true, 'option': true,
    });

    // ─── Search filter ──────────────────
    const filtered = useMemo(() => {
        if (!searchQuery.trim()) return dictionaryEntries;
        const q = searchQuery.toLowerCase();
        return dictionaryEntries.filter(e =>
            e.term.ja.toLowerCase().includes(q) ||
            e.term.en.toLowerCase().includes(q) ||
            e.summary[locale as Locale].toLowerCase().includes(q)
        );
    }, [searchQuery, locale]);

    // ─── Helpers ──────────────────
    const toggleEntry = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const toggleSub = (sub: string) => {
        setExpandedSubs(prev => ({ ...prev, [sub]: !prev[sub] }));
    };

    const getChapterTitle = (chId: number): string => {
        const ch = chapters.find(c => c.id === chId);
        return ch ? ch.title[locale as Locale] : `Ch.${chId}`;
    };

    const scrollToEntry = (id: string) => {
        setExpandedId(id);
        setTimeout(() => {
            document.getElementById(`entry-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    // ─── Category view groups ──────────────────
    const mainCategories: DictMainCategory[] = ['concept', 'command'];
    const subsByCat: Record<DictMainCategory, DictSubCategory[]> = {
        concept: ['basic', 'dockerfile', 'dockerfile-cmd', 'docker-image'],
        command: ['main-command', 'option'],
    };

    // ─── Alpha view groups ──────────────────
    const alphaGroups = useMemo(() => {
        const sorted = [...filtered].sort((a, b) => {
            const aName = a.term.en.toLowerCase().replace(/^-+/, '');
            const bName = b.term.en.toLowerCase().replace(/^-+/, '');
            return aName.localeCompare(bName);
        });

        const groups: { letter: string; entries: DictionaryEntry[] }[] = [];
        let currentLetter = '';
        for (const entry of sorted) {
            const first = entry.term.en.replace(/^-+/, '').charAt(0).toUpperCase();
            if (first !== currentLetter) {
                currentLetter = first;
                groups.push({ letter: first, entries: [] });
            }
            groups[groups.length - 1].entries.push(entry);
        }
        return groups;
    }, [filtered]);

    // ─── Entry card component ──────────────────
    const EntryCard = ({ entry }: { entry: DictionaryEntry }) => {
        const isExpanded = expandedId === entry.id;
        const subLabel = SUB_CATEGORY_LABELS[entry.subCategory][locale as Locale];

        return (
            <div
                id={`entry-${entry.id}`}
                className={`${styles.entryCard} ${isExpanded ? styles.entryCardExpanded : ''}`}
                onClick={() => toggleEntry(entry.id)}
            >
                <div className={styles.entryHeader}>
                    <span className={styles.termName}>{entry.term[locale as Locale]}</span>
                    <div className={styles.badgeGroup}>
                        <span className={`${styles.badge} ${styles.badgeSub}`}>{subLabel}</span>
                        <span className={`${styles.badge} ${styles.badgeChapter}`}>Ch.{entry.firstChapterId}</span>
                    </div>
                    <span className={`${styles.expandIcon} ${isExpanded ? styles.expandIconOpen : ''}`}>▸</span>
                </div>
                <p className={styles.entrySummary}>{entry.summary[locale as Locale]}</p>

                {isExpanded && (
                    <div className={styles.detailView} onClick={(e) => e.stopPropagation()}>
                        {/* 解説 */}
                        <div className={styles.detailSection}>
                            <span className={styles.detailLabel}>📖 {locale === 'ja' ? '解説' : 'Description'}</span>
                            <p className={styles.detailText}>{entry.description[locale as Locale]}</p>
                        </div>

                        {/* 利用例 */}
                        <div className={styles.detailSection}>
                            <span className={styles.detailLabel}>💻 {locale === 'ja' ? '利用例' : 'Usage Examples'}</span>
                            <pre className={styles.codeBlock}>{entry.examples[locale as Locale]}</pre>
                        </div>

                        {/* 初出チャプターリンク */}
                        <div className={styles.detailSection}>
                            <Link
                                href={`/guide/${entry.firstChapterId}`}
                                className={styles.chapterLink}
                            >
                                📍 {locale === 'ja' ? '初出' : 'First appears'}: Ch.{entry.firstChapterId} {getChapterTitle(entry.firstChapterId)} →
                            </Link>
                        </div>

                        {/* 関連用語 */}
                        {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                            <div className={styles.detailSection}>
                                <span className={styles.detailLabel}>🔗 {locale === 'ja' ? '関連用語' : 'Related Terms'}</span>
                                <div className={styles.relatedTerms}>
                                    {entry.relatedTerms.map(rid => {
                                        const related = dictionaryEntries.find(e => e.id === rid);
                                        if (!related) return null;
                                        return (
                                            <button
                                                key={rid}
                                                className={styles.relatedTag}
                                                onClick={() => scrollToEntry(rid)}
                                            >
                                                {related.term[locale as Locale]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.dictPage}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    📚 {locale === 'ja' ? 'Docker コマンド・用語辞書' : 'Docker Command & Term Dictionary'}
                </h1>
                <p className={styles.subtitle}>
                    {locale === 'ja'
                        ? 'Level 1-2 で登場する用語・コマンドの解説'
                        : 'Explanations of terms and commands from Level 1-2'}
                </p>
            </div>

            {/* Search bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ja' ? '🔍 用語を検索...' : '🔍 Search terms...'}
                style={{
                    width: '100%',
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    outline: 'none',
                }}
            />

            {/* View toggle + count */}
            <div className={styles.controls}>
                <button
                    className={`${styles.viewBtn} ${viewMode === 'category' ? styles.viewBtnActive : ''}`}
                    onClick={() => setViewMode('category')}
                >
                    📂 {locale === 'ja' ? 'カテゴリ別' : 'By Category'}
                </button>
                <button
                    className={`${styles.viewBtn} ${viewMode === 'alpha' ? styles.viewBtnActive : ''}`}
                    onClick={() => setViewMode('alpha')}
                >
                    🔤 {locale === 'ja' ? 'アルファベット順' : 'Alphabetical'}
                </button>
                <span className={styles.resultCount}>
                    {filtered.length} {locale === 'ja' ? '件' : 'entries'}
                </span>
            </div>

            {/* ─── Category view ─── */}
            {viewMode === 'category' && (
                <>
                    {mainCategories.map(mc => {
                        const mcLabel = MAIN_CATEGORY_LABELS[mc];
                        const mcEntries = filtered.filter(e => e.mainCategory === mc);
                        if (mcEntries.length === 0) return null;

                        return (
                            <div key={mc} className={styles.mainCatSection}>
                                <div className={styles.mainCatHeader}>
                                    <span className={styles.mainCatIcon}>{mcLabel.icon}</span>
                                    <span>{mcLabel[locale as Locale]}</span>
                                </div>

                                {subsByCat[mc].map(sc => {
                                    const scEntries = mcEntries.filter(e => e.subCategory === sc);
                                    if (scEntries.length === 0) return null;
                                    const scLabel = SUB_CATEGORY_LABELS[sc][locale as Locale];
                                    const isOpen = expandedSubs[sc] !== false;

                                    return (
                                        <div key={sc} className={styles.subCatSection}>
                                            <button className={styles.subCatHeader} onClick={() => toggleSub(sc)}>
                                                <span className={`${styles.subCatChevron} ${isOpen ? styles.subCatChevronOpen : ''}`}>▸</span>
                                                <span>{scLabel}</span>
                                                <span className={styles.subCatCount}>{scEntries.length}</span>
                                            </button>
                                            {isOpen && (
                                                <div className={styles.subCatEntries}>
                                                    {(() => {
                                                        const groups = [...new Set(scEntries.map(e => e.group).filter(Boolean))] as string[];
                                                        if (groups.length <= 1) {
                                                            return scEntries.map(entry => (
                                                                <EntryCard key={entry.id} entry={entry} />
                                                            ));
                                                        }
                                                        return groups.map(g => {
                                                            const gLabel = GROUP_LABELS[g]?.[locale as Locale] || g;
                                                            const gEntries = scEntries.filter(e => e.group === g);
                                                            return (
                                                                <div key={g}>
                                                                    <div className={styles.groupDivider}>── {gLabel} ──</div>
                                                                    {gEntries.map(entry => (
                                                                        <EntryCard key={entry.id} entry={entry} />
                                                                    ))}
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </>
            )}

            {/* ─── Alphabetical view ─── */}
            {viewMode === 'alpha' && (
                <>
                    {alphaGroups.length === 0 && (
                        <div className={styles.emptyState}>
                            {locale === 'ja' ? '該当する用語がありません' : 'No matching terms found'}
                        </div>
                    )}
                    {alphaGroups.map(group => (
                        <div key={group.letter} className={styles.alphaSection}>
                            <div className={styles.alphaDivider}>— {group.letter} —</div>
                            {group.entries.map(entry => (
                                <EntryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    ))}
                </>
            )}

            {/* Empty search state */}
            {viewMode === 'category' && filtered.length === 0 && (
                <div className={styles.emptyState}>
                    {locale === 'ja' ? '該当する用語がありません' : 'No matching terms found'}
                </div>
            )}
        </div>
    );
}
