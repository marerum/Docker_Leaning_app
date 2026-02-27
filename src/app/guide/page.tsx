'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { chapters } from '@/lib/content/chapters';

const LEVEL_META = [
    { level: 1, icon: '🐳', ja: 'Docker 基礎', en: 'Docker Basics' },
    { level: 2, icon: '📝', ja: 'Dockerfile & イメージ', en: 'Dockerfile & Images' },
    { level: 3, icon: '🎼', ja: 'Docker Compose', en: 'Docker Compose' },
];

export default function GuideLandingPage() {
    const { locale, t } = useI18n();

    return (
        <div>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                📖 {t.nav.guide}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
                {locale === 'ja'
                    ? 'Docker の基礎から Docker Compose まで、ステップバイステップで学べるカリキュラムです。'
                    : 'A step-by-step curriculum covering Docker basics to Docker Compose.'}
            </p>

            {LEVEL_META.map(({ level, icon, ja, en }) => {
                const lvlChapters = chapters.filter(c => c.level === level);
                return (
                    <div key={level} style={{
                        background: 'var(--gradient-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-5)',
                        marginBottom: 'var(--space-4)',
                    }}>
                        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span>{icon}</span>
                            <span style={{ color: 'var(--color-accent-primary)', fontSize: 'var(--text-xs)', fontWeight: 700, background: 'rgba(56,189,248,0.15)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>Lv.{level}</span>
                            <span>{locale === 'ja' ? ja : en}</span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {lvlChapters.map(ch => (
                                <Link key={ch.id} href={`/guide/${ch.id}`} style={{
                                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'var(--color-bg-secondary)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    textDecoration: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--text-sm)',
                                    transition: 'all 0.15s ease',
                                }}>
                                    <span style={{ fontSize: 'var(--text-lg)' }}>{ch.icon}</span>
                                    <span style={{ flex: 1 }}>
                                        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginRight: 'var(--space-2)' }}>Ch.{ch.id}</span>
                                        {ch.title[locale]}
                                    </span>
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
