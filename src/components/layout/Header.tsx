'use client';

import { useI18n } from '@/lib/i18n';
import styles from './Header.module.css';

interface HeaderProps {
    level: number;
}

export default function Header({ level }: HeaderProps) {
    const { locale, os, t, toggleLocale, toggleOS } = useI18n();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span className={styles.logoIcon}>🐳</span>
                <span className={styles.logoText}>{t.common.appName}</span>
                <span className={styles.betaBadge}>β</span>
            </div>

            <div className={styles.controls}>
                {/* OS Toggle */}
                <div className={styles.toggleGroup}>
                    <button
                        className={`${styles.toggleBtn} ${os === 'windows' ? styles.toggleBtnActive : ''}`}
                        onClick={() => os !== 'windows' && toggleOS()}
                        title="Windows"
                    >
                        🪟 Win
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${os === 'mac' ? styles.toggleBtnActive : ''}`}
                        onClick={() => os !== 'mac' && toggleOS()}
                        title="macOS"
                    >
                        🍎 Mac
                    </button>
                </div>

                {/* Language Toggle */}
                <div className={styles.toggleGroup}>
                    <button
                        className={`${styles.toggleBtn} ${locale === 'ja' ? styles.toggleBtnActive : ''}`}
                        onClick={() => locale !== 'ja' && toggleLocale()}
                    >
                        JP
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${locale === 'en' ? styles.toggleBtnActive : ''}`}
                        onClick={() => locale !== 'en' && toggleLocale()}
                    >
                        EN
                    </button>
                </div>

                {/* Level Badge */}
                <div className={styles.levelBadge}>
                    <span className={styles.levelIcon}>👤</span>
                    <span>{t.header.level}{level}</span>
                </div>
            </div>
        </header>
    );
}
