'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n, Locale } from '@/lib/i18n';
import { getChapter, ChapterData, SimulationStep, CheckpointQuestion } from '@/lib/content/chapters';
import { getStore, XP_TABLE } from '@/lib/store';
import styles from './guide.module.css';

// Simple markdown-like renderer (basic subset)
function renderMarkdown(text: string): string {
    return text
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(Boolean).map(c => c.trim());
            return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
        })
        .replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>')
        .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
}

export default function GuidePage() {
    const params = useParams();
    const chapterId = Number(params?.id);
    const chapter = getChapter(chapterId);
    const { locale, os, t } = useI18n();

    if (!chapter) {
        return (
            <div className={styles.guidePage}>
                <h1>Chapter not found</h1>
                <Link href="/" className={styles.navBtn}>{t.common.prev}</Link>
            </div>
        );
    }

    return (
        <div className={styles.guidePage}>
            <ChapterHeader chapter={chapter} locale={locale} />
            <IntroSection chapter={chapter} locale={locale} t={t} />
            <GoalsSection chapter={chapter} locale={locale} t={t} />
            <ConceptSection chapter={chapter} locale={locale} t={t} />
            <SimulationSection chapter={chapter} locale={locale} t={t} />
            <LocalPracticeSection chapter={chapter} locale={locale} os={os} t={t} />
            <CheckpointSection chapter={chapter} locale={locale} t={t} />
        </div>
    );
}

// ─── Chapter Header ──────────────────
function ChapterHeader({ chapter, locale }: { chapter: ChapterData; locale: Locale }) {
    const prevId = chapter.id > 1 ? chapter.id - 1 : null;
    const nextId = chapter.id < 12 ? chapter.id + 1 : null;

    return (
        <div className={styles.chapterHeader}>
            <span className={styles.chapterIcon}>{chapter.icon}</span>
            <div className={styles.chapterMeta}>
                <div className={styles.chapterLevel}>Level {chapter.level} · Chapter {chapter.id}</div>
                <h1 className={styles.chapterTitle}>{chapter.title[locale]}</h1>
            </div>
            <div className={styles.chapterNav}>
                {prevId && <Link href={`/guide/${prevId}`} className={styles.navBtn}>← Prev</Link>}
                {nextId && <Link href={`/guide/${nextId}`} className={styles.navBtn}>Next →</Link>}
            </div>
        </div>
    );
}

// ─── Intro Section ──────────────────
function IntroSection({ chapter, locale, t }: { chapter: ChapterData; locale: Locale; t: any }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🗺️</span>
                <h2 className={styles.sectionTitle}>{t.guide.intro} — {t.guide.why}</h2>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)' }}>
                {chapter.intro.overview[locale]}
            </p>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>
                {chapter.intro.why[locale]}
            </p>
            <div className={styles.introGrid}>
                <div className={`${styles.introCard} ${styles.introCardBefore}`}>
                    <div className={styles.introCardLabel}>{t.guide.beforeAfter.before}</div>
                    <div className={styles.introCardText}>{chapter.intro.before[locale]}</div>
                </div>
                <div className={`${styles.introCard} ${styles.introCardAfter}`}>
                    <div className={styles.introCardLabel}>{t.guide.beforeAfter.after}</div>
                    <div className={styles.introCardText}>{chapter.intro.after[locale]}</div>
                </div>
            </div>
        </section>
    );
}

// ─── Goals Section ──────────────────
function GoalsSection({ chapter, locale, t }: { chapter: ChapterData; locale: Locale; t: any }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🎯</span>
                <h2 className={styles.sectionTitle}>{t.guide.goal}</h2>
            </div>
            <ul className={styles.goalsList}>
                {chapter.goals.map((goal, i) => (
                    <li key={i} className={styles.goalItem}>
                        <span className={styles.goalCheck}>◻</span>
                        <span>{goal[locale]}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// ─── Concept Section ──────────────────
function ConceptSection({ chapter, locale, t }: { chapter: ChapterData; locale: Locale; t: any }) {
    const html = renderMarkdown(chapter.concept.content[locale]);
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>📘</span>
                <h2 className={styles.sectionTitle}>{t.guide.concept}</h2>
            </div>
            <div
                className={styles.conceptContent}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    );
}

// ─── Simulation Terminal ──────────────────
function SimulationSection({ chapter, locale, t }: { chapter: ChapterData; locale: Locale; t: any }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [history, setHistory] = useState<{ type: 'prompt' | 'command' | 'output' | 'success' | 'error'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [completed, setCompleted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const steps = chapter.simulation;
    const step = steps[currentStep];

    useEffect(() => {
        if (step && history.length === 0) {
            setHistory([{ type: 'prompt', text: step.prompt[locale] }]);
        }
    }, [currentStep]);

    useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }, [history]);

    const handleSubmit = async (e: KeyboardEvent) => {
        if (e.key !== 'Enter' || !input.trim() || !step) return;

        const cmd = input.trim();
        setInput('');
        setShowHint(false);

        const newHistory = [...history, { type: 'command' as const, text: `$ ${cmd}` }];

        const isCorrect = cmd === step.expectedCommand ||
            (step.alternativeCommands && step.alternativeCommands.includes(cmd));

        if (isCorrect) {
            newHistory.push({ type: 'output' as const, text: step.output });
            newHistory.push({ type: 'success' as const, text: `${t.terminal.success} +${step.xp}XP` });

            // Award XP
            const store = getStore();
            await store.addXP(step.xp);

            setHistory(newHistory);

            // Move to next step or finish
            setTimeout(() => {
                if (currentStep + 1 < steps.length) {
                    const nextStep = steps[currentStep + 1];
                    setCurrentStep(currentStep + 1);
                    setHistory(prev => [...prev, { type: 'prompt', text: nextStep.prompt[locale] }]);
                } else {
                    setCompleted(true);
                }
            }, 1000);
        } else {
            newHistory.push({ type: 'error' as const, text: `bash: ${cmd}: ${t.terminal.error}` });
            newHistory.push({ type: 'prompt' as const, text: t.terminal.tryAgain });
            setHistory(newHistory);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>💻</span>
                <h2 className={styles.sectionTitle}>{t.guide.simulation}</h2>
            </div>

            <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                    <span className={`${styles.terminalDot} ${styles.dotRed}`} />
                    <span className={`${styles.terminalDot} ${styles.dotYellow}`} />
                    <span className={`${styles.terminalDot} ${styles.dotGreen}`} />
                    <span className={styles.terminalTitle}>{t.terminal.title}</span>
                </div>

                <div className={styles.terminalBody} ref={bodyRef} onClick={() => {
                    const selection = window.getSelection();
                    if (!selection || selection.isCollapsed) {
                        inputRef.current?.focus();
                    }
                }}>
                    {history.map((item, i) => (
                        <div key={i} className={styles.terminalOutput}>
                            {item.type === 'prompt' && <span style={{ color: 'var(--color-accent-primary)' }}>💡 {item.text}</span>}
                            {item.type === 'command' && <span className={styles.terminalCommand}>{item.text}</span>}
                            {item.type === 'output' && <span className={styles.terminalResult}>{item.text}</span>}
                            {item.type === 'success' && <span style={{ color: 'var(--color-accent-success)' }}>{item.text}</span>}
                            {item.type === 'error' && <span style={{ color: 'var(--color-accent-danger)' }}>{item.text}</span>}
                        </div>
                    ))}

                    {!completed && (
                        <div className={styles.terminalInputLine}>
                            <span className={styles.terminalPrompt}>$ </span>
                            <input
                                ref={inputRef}
                                className={styles.terminalInput}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleSubmit}
                                placeholder={t.terminal.placeholder}
                                autoFocus
                                spellCheck={false}
                            />
                        </div>
                    )}
                </div>

                {!completed && step && (
                    <div className={styles.simPrompt}>
                        <span>{locale === 'ja' ? `ステップ ${currentStep + 1}/${steps.length}` : `Step ${currentStep + 1}/${steps.length}`}</span>
                        <button className={styles.hintBtn} onClick={() => setShowHint(!showHint)}>
                            {showHint ? step.hint[locale] : `💡 ${t.terminal.hint}`}
                        </button>
                    </div>
                )}

                {completed && (
                    <div className={styles.successMsg}>
                        <span>🎉</span>
                        <span>{locale === 'ja' ? 'すべてのコマンド演習を完了しました！' : 'All command exercises completed!'}</span>
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── Local Practice ──────────────────
function LocalPracticeSection({ chapter, locale, os, t }: { chapter: ChapterData; locale: Locale; os: string; t: any }) {
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const copyCommand = (cmd: string, idx: number) => {
        navigator.clipboard.writeText(cmd);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🐳</span>
                <h2 className={styles.sectionTitle}>{t.guide.localPractice}</h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                {chapter.localPractice.instructions[locale]}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {locale === 'ja'
                    ? `ターミナル: ${os === 'windows' ? 'PowerShell' : 'Terminal'}`
                    : `Terminal: ${os === 'windows' ? 'PowerShell' : 'Terminal'}`}
            </p>
            <div className={styles.localCommands}>
                {chapter.localPractice.commands.map((cmd, i) => (
                    <div key={i} className={styles.commandRow}>
                        <span style={{ color: 'var(--color-accent-success)', marginRight: '4px' }}>
                            {os === 'windows' ? 'PS>' : '$'}
                        </span>
                        <span className={styles.commandText}>{cmd}</span>
                        <button
                            className={styles.copyBtn}
                            onClick={() => copyCommand(cmd, i)}
                        >
                            {copiedIdx === i ? t.common.copied : t.common.copy}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Checkpoint Quiz ──────────────────
function CheckpointSection({ chapter, locale, t }: { chapter: ChapterData; locale: Locale; t: any }) {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [chapterCompleted, setChapterCompleted] = useState(false);

    const question = chapter.checkpoint[0];
    if (!question) return null;

    const handleAnswer = async (idx: number) => {
        if (answered) return;
        setSelectedIdx(idx);
        setAnswered(true);

        if (idx === question.correctIndex) {
            const store = getStore();
            await store.addXP(XP_TABLE.checkpointCorrect);
        }
    };

    const handleCompleteChapter = async () => {
        const store = getStore();
        await store.addXP(chapter.completionXP);
        await store.saveProgress(String(chapter.id), {
            chapterId: String(chapter.id),
            status: 'completed',
            sectionsCompleted: ['intro', 'concept', 'simulation', 'local_practice', 'checkpoint'],
            xpEarned: chapter.completionXP,
            completedAt: new Date().toISOString(),
        });

        // Check for first container badge
        if (chapter.id === 2) {
            await store.unlockBadge('first-container');
        }

        setChapterCompleted(true);
    };

    const nextChapter = chapter.id < 12 ? chapter.id + 1 : null;

    if (chapterCompleted) {
        return (
            <section className={`${styles.section} ${styles.completeSection}`}>
                <span className={styles.completeIcon}>🏆</span>
                <h2 className={styles.completeTitle}>{t.guide.chapterComplete}</h2>
                <div className={styles.completeXP}>+{chapter.completionXP} XP</div>
                <div className={styles.completeActions}>
                    <Link href="/" className={styles.navBtn}>🏠 Home</Link>
                    {nextChapter && (
                        <Link href={`/guide/${nextChapter}`} className={styles.navBtn}>
                            {t.common.next} →
                        </Link>
                    )}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>✅</span>
                <h2 className={styles.sectionTitle}>{t.guide.checkpoint}</h2>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                {question.question[locale]}
            </p>
            <div className={styles.quizOptions}>
                {question.options.map((opt, i) => {
                    let cls = styles.quizOption;
                    if (answered && i === question.correctIndex) cls += ` ${styles.quizCorrect}`;
                    else if (answered && i === selectedIdx) cls += ` ${styles.quizWrong}`;
                    return (
                        <button
                            key={i}
                            className={cls}
                            onClick={() => handleAnswer(i)}
                            disabled={answered}
                        >
                            {opt[locale]}
                        </button>
                    );
                })}
            </div>
            {answered && (
                <>
                    <div className={styles.quizExplanation}>
                        {question.explanation[locale]}
                    </div>
                    <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
                        <button className={styles.navBtn} onClick={handleCompleteChapter} style={{
                            background: 'var(--gradient-primary)',
                            color: 'var(--color-bg-primary)',
                            fontWeight: 700,
                            padding: 'var(--space-3) var(--space-8)',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 'var(--text-base)',
                        }}>
                            🏆 {t.common.complete}
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
