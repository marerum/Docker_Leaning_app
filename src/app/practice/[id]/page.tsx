'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { getPracticeExercise, practiceExercises } from '@/lib/content/practices';
import styles from './exercise.module.css';

export default function ExercisePage() {
    const params = useParams();
    const exerciseId = params?.id as string;
    const exercise = getPracticeExercise(exerciseId);
    const { locale, os } = useI18n();
    const [checked, setChecked] = useState<boolean[]>([]);
    const [copied, setCopied] = useState<string | null>(null);

    if (!exercise) {
        return (
            <div className={styles.exercisePage}>
                <h1>{locale === 'ja' ? '演習が見つかりません' : 'Exercise not found'}</h1>
                <Link href="/practice" className={styles.backBtn}>
                    ← {locale === 'ja' ? '一覧に戻る' : 'Back to list'}
                </Link>
            </div>
        );
    }

    // Initialize checklist
    if (checked.length !== exercise.checklist.length) {
        setChecked(new Array(exercise.checklist.length).fill(false));
    }

    const toggleCheck = (idx: number) => {
        setChecked(prev => {
            const next = [...prev];
            next[idx] = !next[idx];
            return next;
        });
    };

    const copyCommand = (cmd: string) => {
        navigator.clipboard.writeText(cmd);
        setCopied(cmd);
        setTimeout(() => setCopied(null), 1500);
    };

    // Find prev/next exercise
    const allIds = practiceExercises.map(e => e.id);
    const currentIdx = allIds.indexOf(exerciseId);
    const prevId = currentIdx > 0 ? allIds[currentIdx - 1] : null;
    const nextId = currentIdx < allIds.length - 1 ? allIds[currentIdx + 1] : null;

    return (
        <div className={styles.exercisePage}>
            {/* Header */}
            <div className={styles.header}>
                <span className={styles.headerIcon}>{exercise.icon}</span>
                <div className={styles.headerMeta}>
                    <div className={styles.headerLevel}>{exercise.levelLabel}</div>
                    <h1 className={styles.headerTitle}>
                        #{exercise.id} {exercise.title[locale]}
                    </h1>
                </div>
                <Link href="/practice" className={styles.backBtn}>
                    ← {locale === 'ja' ? '一覧' : 'List'}
                </Link>
            </div>

            {/* Goal */}
            <div className={styles.goalSection}>
                <div className={styles.goalLabel}>🎯 {locale === 'ja' ? 'ゴール' : 'Goal'}</div>
                <div className={styles.goalText}>{exercise.goal[locale]}</div>
            </div>

            {/* Steps */}
            <div className={styles.stepsSection}>
                <h2 className={styles.sectionTitle}>
                    📝 {locale === 'ja' ? 'ステップ' : 'Steps'}
                </h2>
                {exercise.steps.map((step, i) => (
                    <div key={i} className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>{i + 1}</span>
                            <span className={styles.stepTitle}>{step.title[locale]}</span>
                        </div>
                        <div className={styles.stepContent}>{step.content[locale]}</div>

                        {/* OS-specific content */}
                        {step.osSpecific && (
                            <>
                                <div className={styles.osToggle}>
                                    <span
                                        className={`${styles.osBtn} ${os === 'windows' ? styles.osBtnActive : ''}`}
                                        style={{ cursor: 'default' }}
                                    >
                                        🪟 Windows
                                    </span>
                                    <span
                                        className={`${styles.osBtn} ${os === 'mac' ? styles.osBtnActive : ''}`}
                                        style={{ cursor: 'default' }}
                                    >
                                        🍎 Mac
                                    </span>
                                </div>
                                <div className={styles.osContent}>
                                    {os === 'windows'
                                        ? step.osSpecific.windows[locale]
                                        : step.osSpecific.mac[locale]}
                                </div>
                            </>
                        )}

                        {/* Commands */}
                        {step.commands && step.commands.length > 0 && (
                            <div className={styles.commandBlock}>
                                {step.commands.map((cmd, ci) => (
                                    <div key={ci} className={styles.commandRow}>
                                        <span className={styles.commandText}>$ {cmd}</span>
                                        <button
                                            className={styles.copyBtn}
                                            onClick={() => copyCommand(cmd)}
                                        >
                                            {copied === cmd ? '✓' : locale === 'ja' ? 'コピー' : 'Copy'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Checklist */}
            <div className={styles.checklistSection}>
                <h2 className={styles.sectionTitle}>
                    ✅ {locale === 'ja' ? '到達確認' : 'Checklist'}
                </h2>
                {exercise.checklist.map((item, i) => (
                    <div
                        key={i}
                        className={styles.checklistItem}
                        onClick={() => toggleCheck(i)}
                    >
                        <span className={`${styles.checkbox} ${checked[i] ? styles.checkboxChecked : ''}`}>
                            {checked[i] ? '✓' : ''}
                        </span>
                        <span className={checked[i] ? styles.checklistTextChecked : ''}>
                            {item[locale]}
                        </span>
                    </div>
                ))}
            </div>

            {/* Troubleshooting */}
            {exercise.troubleshooting && exercise.troubleshooting.length > 0 && (
                <div className={styles.troubleSection}>
                    <h2 className={styles.sectionTitle}>
                        ⚠️ {locale === 'ja' ? 'つまずきポイント' : 'Troubleshooting'}
                    </h2>
                    {exercise.troubleshooting.map((item, i) => (
                        <div key={i} className={styles.troubleItem}>
                            <div className={styles.troubleSymptom}>
                                {item.symptom[locale]}
                            </div>
                            <div className={styles.troubleFix}>
                                → {item.fix[locale]}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tips */}
            {exercise.tips && (
                <div className={styles.tipsSection}>
                    <strong>💡 {locale === 'ja' ? '豆知識' : 'Tips'}</strong>
                    <br /><br />
                    {exercise.tips[locale]}
                </div>
            )}

            {/* Navigation */}
            <div className={styles.exerciseNav}>
                {prevId ? (
                    <Link href={`/practice/${prevId}`} className={styles.navBtn}>
                        ← {locale === 'ja' ? '前の演習' : 'Previous'}
                    </Link>
                ) : <span />}
                {nextId ? (
                    <Link href={`/practice/${nextId}`} className={styles.navBtn}>
                        {locale === 'ja' ? '次の演習' : 'Next'} →
                    </Link>
                ) : (
                    <Link href="/practice" className={styles.navBtn}>
                        {locale === 'ja' ? '一覧に戻る' : 'Back to list'}
                    </Link>
                )}
            </div>
        </div>
    );
}
