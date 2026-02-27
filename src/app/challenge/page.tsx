'use client';

import { useI18n } from '@/lib/i18n';

export default function ChallengePage() {
    const { locale } = useI18n();
    return (
        <div>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                🎮 {locale === 'ja' ? 'チャレンジ' : 'Challenge'}
            </h1>
            <div style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                textAlign: 'center',
                marginTop: 'var(--space-6)',
            }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }}>🚧</span>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    {locale === 'ja' ? 'Coming Soon' : 'Coming Soon'}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {locale === 'ja'
                        ? 'チャレンジモードは次のアップデートで追加予定です。'
                        : 'Challenge mode will be added in the next update.'}
                </p>
            </div>
        </div>
    );
}
