'use client';

import { useI18n } from '@/lib/i18n';
import { xpForNextLevel } from '@/lib/store';
import styles from './XPBar.module.css';

interface XPBarProps {
    totalXP: number;
    level: number;
    badgeCount: number;
    streak: number;
}

export default function XPBar({ totalXP, level, badgeCount, streak }: XPBarProps) {
    const { t } = useI18n();
    const { current, needed, progress } = xpForNextLevel(totalXP);

    return (
        <footer className={styles.xpBar}>
            <div className={styles.xpInfo}>
                <span>📊</span>
                <span>{t.progress.xpLabel}</span>
            </div>

            <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
                <span className={styles.progressText}>
                    {current}/{needed}
                </span>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statIcon}>🏆</span>
                    <span>×{badgeCount}</span>
                </div>
                {streak > 0 && (
                    <div className={styles.stat}>
                        <span className={styles.statIcon}>🔥</span>
                        <span>{streak}{t.progress.days}</span>
                    </div>
                )}
            </div>
        </footer>
    );
}
