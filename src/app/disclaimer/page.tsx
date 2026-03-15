'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import styles from '../privacy/privacy.module.css';

export default function DisclaimerPage() {
    const { locale } = useI18n();
    const lang = locale === 'en' ? 'en' : 'ja';

    if (lang === 'en') {
        return (
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>
                    <h1 className={styles.pageTitle}>⚠️ Disclaimer</h1>
                    <p className={styles.lastUpdated}>Last updated: March 15, 2026</p>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>This is a Demo / Beta Version</h2>
                        <p>Docker Quest is currently a <strong>demo version under active development</strong>. It is intended for concept validation and feedback collection purposes.</p>
                        <p>The β (beta) badge displayed in the header indicates this status.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>What This Means</h2>
                        <ul className={styles.list}>
                            <li>Content, features, and design may change significantly without notice</li>
                            <li>Some features are marked as "Coming Soon" and not yet implemented</li>
                            <li>Learning progress is saved locally in your browser only — it may be lost if you clear browser data</li>
                            <li>The accuracy of all content is not guaranteed</li>
                            <li>This service is not intended for commercial use at this stage</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Feedback Welcome</h2>
                        <p>We are actively seeking feedback from learners. If you find any issues or have suggestions, please reach out via <a href="https://github.com/marerum/Docker_Leaning_app/issues" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub Issues</a>.</p>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <Link href="/" className={styles.backLink}>← ホームに戻る</Link>
                <h1 className={styles.pageTitle}>⚠️ 免責事項</h1>
                <p className={styles.lastUpdated}>最終更新日: 2026年3月15日</p>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>デモ版・ベータ版について</h2>
                    <p>Docker Quest は現在、<strong>構想・開発段階のデモ版（β版）</strong>です。コンセプトの検証およびフィードバック収集を目的として公開しています。</p>
                    <p>ヘッダーに表示されている <strong>β</strong> バッジはこの状態を示しています。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>ご利用にあたっての注意事項</h2>
                    <ul className={styles.list}>
                        <li>コンテンツ・機能・デザインは予告なく大幅に変更される場合があります</li>
                        <li>「Coming Soon」と表示されている機能は未実装です</li>
                        <li>学習進捗はお使いのブラウザにのみ保存されます。ブラウザのデータを削除すると消失します</li>
                        <li>掲載しているコマンドや解説の正確性は保証しません。必ず公式ドキュメントと併せてご確認ください</li>
                        <li>本サービスは現時点では商用サービスではありません</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>フィードバックのお願い</h2>
                    <p>学習中に気づいた点・改善のご要望などは <a href="https://github.com/marerum/Docker_Leaning_app/issues" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub Issues</a> よりお気軽にお寄せください。いただいたフィードバックを参考に開発を進めています。</p>
                </section>
            </div>
        </div>
    );
}
