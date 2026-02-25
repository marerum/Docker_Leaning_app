'use client';

import { useState, useEffect, ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n';
import { getStore } from '@/lib/store';
import Header from './Header';
import Sidebar from './Sidebar';
import XPBar from './XPBar';
import styles from './AppShell.module.css';

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const [level, setLevel] = useState(1);
    const [totalXP, setTotalXP] = useState(0);
    const [badgeCount, setBadgeCount] = useState(0);
    const [streak, setStreak] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const store = getStore();

        async function loadData() {
            const profile = await store.getProfile();
            setLevel(profile.level);
            setTotalXP(profile.totalXP);
            setStreak(profile.streak);

            const badges = await store.getBadges();
            setBadgeCount(badges.length);

            // Record daily activity
            const newStreak = await store.recordActivity();
            setStreak(newStreak);
        }

        loadData();
    }, []);

    if (!mounted) {
        return (
            <div className={styles.appShell}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-lg)',
                }}>
                    🐳 Loading...
                </div>
            </div>
        );
    }

    return (
        <I18nProvider>
            <div className={styles.appShell}>
                <Sidebar streak={streak} />
                <Header level={level} />
                <main className={styles.mainArea}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </main>
                <XPBar
                    totalXP={totalXP}
                    level={level}
                    badgeCount={badgeCount}
                    streak={streak}
                />
            </div>
        </I18nProvider>
    );
}
