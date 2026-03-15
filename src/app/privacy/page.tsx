'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import styles from './privacy.module.css';

export default function PrivacyPage() {
    const { locale } = useI18n();
    const lang = locale === 'en' ? 'en' : 'ja';

    if (lang === 'en') {
        return (
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>
                    <h1 className={styles.pageTitle}>🔏 Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: March 15, 2026</p>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Overview</h2>
                        <p>Docker Quest ("this service") respects your privacy. This policy explains what information is collected when you use this service and how it is handled.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
                        <h3 className={styles.subTitle}>2-1. Data stored in your browser (LocalStorage)</h3>
                        <p>This service saves the following data locally in your browser to record your learning progress. This data is <strong>not sent to any server</strong>.</p>
                        <ul className={styles.list}>
                            <li>Learning progress (chapter completion status, XP earned)</li>
                            <li>User level and experience points (XP)</li>
                            <li>Earned badges</li>
                            <li>Learning streak (consecutive days)</li>
                            <li>Language preference (Japanese/English) and OS preference (Windows/Mac)</li>
                        </ul>
                        <p>All data is stored under the key prefix <code className={styles.code}>dq-</code> in your browser&apos;s LocalStorage and can be deleted at any time via your browser settings.</p>

                        <h3 className={styles.subTitle}>2-2. Access logs collected by the hosting provider</h3>
                        <p>This service is hosted on <strong>Vercel</strong>. When you access the service, Vercel may automatically collect the following information as access logs:</p>
                        <ul className={styles.list}>
                            <li>IP address</li>
                            <li>Browser type and OS</li>
                            <li>Accessed URL and referrer</li>
                            <li>Date and time of access</li>
                        </ul>
                        <p>These logs are managed according to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.link}>Vercel&apos;s Privacy Policy</a>. Docker Quest does not use these logs to identify individual users.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Use of Cookies</h2>
                        <p>This service does not use cookies for tracking or advertising purposes. Only browser LocalStorage is used.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Third-Party Disclosure</h2>
                        <p>We do not sell or provide your personal information to third parties. Access log management is delegated to Vercel as the hosting provider.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Data Deletion</h2>
                        <p>You can delete all locally stored learning data (LocalStorage) at any time from your browser settings (Developer Tools → Application → LocalStorage → delete keys starting with <code className={styles.code}>dq-</code>).</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Changes to This Policy</h2>
                        <p>If this policy is revised, the updated version will be posted on this page. Continued use of the service after changes constitutes acceptance of the revised policy.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Contact</h2>
                        <p>For questions or concerns about this privacy policy, please contact us via <a href="https://github.com/marerum/Docker_Leaning_app/issues" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub Issues</a>.</p>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <Link href="/" className={styles.backLink}>← ホームに戻る</Link>
                <h1 className={styles.pageTitle}>🔏 プライバシーポリシー</h1>
                <p className={styles.lastUpdated}>最終更新日: 2026年3月15日</p>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. はじめに</h2>
                    <p>Docker Quest（以下「本サービス」）は、ご利用いただくユーザーのプライバシーを尊重します。本ポリシーでは、本サービスの利用時に収集される情報とその取り扱いについて説明します。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. 収集する情報</h2>
                    <h3 className={styles.subTitle}>2-1. ブラウザに保存されるデータ（LocalStorage）</h3>
                    <p>本サービスは、学習進捗を記録するために以下のデータをお使いのブラウザにローカル保存します。これらのデータは<strong>サーバーへは一切送信されません</strong>。</p>
                    <ul className={styles.list}>
                        <li>学習進捗（各章の完了状況、獲得XP）</li>
                        <li>ユーザーレベルと経験値（XP）</li>
                        <li>取得バッジ</li>
                        <li>学習ストリーク（連続学習日数）</li>
                        <li>言語設定（日本語/英語）およびOS設定（Windows/Mac）</li>
                    </ul>
                    <p>すべてのデータはブラウザの LocalStorage に <code className={styles.code}>dq-</code> というキープレフィックスで保存されており、ブラウザの設定からいつでも削除できます。</p>

                    <h3 className={styles.subTitle}>2-2. ホスティングサービスが収集するアクセスログ</h3>
                    <p>本サービスは <strong>Vercel</strong> にホスティングされています。サービスにアクセスした際、Vercel がアクセスログとして以下の情報を自動的に収集することがあります。</p>
                    <ul className={styles.list}>
                        <li>IPアドレス</li>
                        <li>ブラウザの種類およびOS</li>
                        <li>アクセスしたURL・リファラー</li>
                        <li>アクセス日時</li>
                    </ul>
                    <p>これらのログは <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.link}>Vercel のプライバシーポリシー</a> に従って管理されます。Docker Quest はこれらのログを個人の特定に利用しません。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Cookieの利用</h2>
                    <p>本サービスは、トラッキングや広告目的でのCookieを使用しません。ブラウザの LocalStorage のみを使用しています。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. 第三者への提供</h2>
                    <p>収集した個人情報を第三者へ販売・提供することはありません。アクセスログの管理はホスティングプロバイダーである Vercel に委託されます。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. データの削除</h2>
                    <p>ローカルに保存された学習データ（LocalStorage）は、ブラウザの設定（デベロッパーツール → Application → LocalStorage → <code className={styles.code}>dq-</code> で始まるキーを削除）からいつでも削除できます。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. ポリシーの変更</h2>
                    <p>本ポリシーを改定する場合は、本ページに最新版を掲載します。改定後も引き続き本サービスをご利用いただいた場合、改定後のポリシーに同意したものとみなします。</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. お問い合わせ</h2>
                    <p>本プライバシーポリシーに関するご質問・ご意見は、<a href="https://github.com/marerum/Docker_Leaning_app/issues" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub Issues</a> よりご連絡ください。</p>
                </section>
            </div>
        </div>
    );
}
