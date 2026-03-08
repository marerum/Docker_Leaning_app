'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { practiceExercises, WIP_EXERCISES, PRACTICE_LEVEL_LABELS } from '@/lib/content/practices';
import styles from './practice.module.css';

export default function PracticePage() {
    const { locale } = useI18n();

    const exercisesByLevel = [0, 1].map(level => ({
        level,
        label: PRACTICE_LEVEL_LABELS.implemented[level][locale],
        exercises: practiceExercises.filter(e => e.level === level),
    }));

    return (
        <div className={styles.practicePage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    💻 {locale === 'ja' ? '実践演習' : 'Practice Exercises'}
                </h1>
                <p className={styles.pageDesc}>
                    {locale === 'ja'
                        ? 'ローカル環境で実際にDockerを操作しながら学ぶハンズオン演習です。'
                        : 'Hands-on exercises to learn Docker by doing on your local machine.'}
                </p>
            </div>

            {/* Implemented levels */}
            {exercisesByLevel.map(({ level, label, exercises }) => (
                <div key={level} className={styles.levelGroup}>
                    <div className={styles.levelHeader}>
                        <span className={styles.levelBadge}>Lv.{level}</span>
                        <span className={styles.levelTitle}>{label}</span>
                    </div>
                    <div className={styles.exerciseGrid}>
                        {exercises.map(ex => (
                            <Link
                                key={ex.id}
                                href={`/practice/${ex.id}`}
                                className={styles.exerciseCard}
                            >
                                <div className={styles.exerciseCardHeader}>
                                    <span className={styles.exerciseIcon}>{ex.icon}</span>
                                    <span className={styles.exerciseId}>#{ex.id}</span>
                                </div>
                                <div className={styles.exerciseTitle}>{ex.title[locale]}</div>
                                <div className={styles.exerciseGoal}>{ex.goal[locale]}</div>
                                <div className={styles.exerciseFooter}>
                                    <span className={styles.stepCount}>
                                        {ex.steps.length} {locale === 'ja' ? 'ステップ' : 'steps'}
                                    </span>
                                    <span className={styles.stepCount}>
                                        {ex.checklist.length} {locale === 'ja' ? 'チェック' : 'checks'}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}

            {/* WIP levels */}
            <div className={styles.wipSection}>
                <div className={styles.levelHeader}>
                    <span className={styles.levelBadgeWip}>🚧</span>
                    <span className={styles.levelTitle}>
                        {locale === 'ja' ? '今後追加予定' : 'Coming Soon'}
                    </span>
                </div>
                {WIP_EXERCISES.map(wl => (
                    <div key={wl.levelLabel} style={{ marginTop: 'var(--space-3)' }}>
                        <div className={styles.levelHeader}>
                            <span className={styles.levelBadgeWip}>{wl.levelLabel}</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                                {PRACTICE_LEVEL_LABELS.wip[WIP_EXERCISES.indexOf(wl)][locale]}
                            </span>
                            <span className={styles.wipTag}>
                                {locale === 'ja' ? '（工事中）' : '(WIP)'}
                            </span>
                        </div>
                        <div className={styles.wipExerciseList}>
                            {wl.exercises.map(ex => (
                                <div key={ex.id} className={styles.wipExerciseItem}>
                                    <span className={styles.wipExerciseItemIcon}>{ex.icon}</span>
                                    <span>{ex.title[locale]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
