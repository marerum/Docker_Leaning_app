'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import styles from './Sidebar.module.css';

interface SidebarProps {
    streak: number;
}

const NAV_ITEMS = [
    { key: 'guide', icon: '📖', href: '/guide' },
    { key: 'practice', icon: '💻', href: '/practice' },
    { key: 'dictionary', icon: '📚', href: '/dictionary' },
    { key: 'challenge', icon: '🎮', href: '/challenge' },
    { key: 'progress', icon: '📊', href: '/progress' },
] as const;

export default function Sidebar({ streak }: SidebarProps) {
    const { t } = useI18n();
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <span className={styles.sidebarLogoIcon}>🐳</span>
                <span className={styles.sidebarLogoText}>{t.common.appName}</span>
            </div>

            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const label = t.nav[item.key];
                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{label}</span>
                        </Link>
                    );
                })}
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
