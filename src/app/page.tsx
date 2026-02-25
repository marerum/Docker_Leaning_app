'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import styles from './page.module.css';

const COURSES = [
  {
    id: 'level1',
    icon: '🏠',
    levelClass: 'levelBeginner',
    levelLabel: { ja: '初級', en: 'Beginner' },
    href: '/guide/1',
    chapters: 6,
  },
  {
    id: 'level2',
    icon: '🏰',
    levelClass: 'levelBeginner',
    levelLabel: { ja: '初〜中級', en: 'Beginner-Intermediate' },
    href: '/guide/7',
    chapters: 3,
  },
  {
    id: 'level3',
    icon: '🌍',
    levelClass: 'levelIntermediate',
    levelLabel: { ja: '中級', en: 'Intermediate' },
    href: '/guide/10',
    chapters: 3,
  },
] as const;

const FEATURES = [
  { icon: '💻', title: { ja: 'ハンズオン', en: 'Hands-on' }, desc: { ja: 'ブラウザ内でDocker操作', en: 'Docker in your browser' } },
  { icon: '📊', title: { ja: '成長の可視化', en: 'Track Growth' }, desc: { ja: 'XP・レベル・バッジ', en: 'XP, levels & badges' } },
  { icon: '📚', title: { ja: 'コマンド辞書', en: 'Command Ref' }, desc: { ja: 'いつでも参照可能', en: 'Reference anytime' } },
  { icon: '🌐', title: { ja: '多言語対応', en: 'Multilingual' }, desc: { ja: '日本語 / English', en: 'Japanese / English' } },
];

export default function HomePage() {
  const { locale, t } = useI18n();

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroIcon}>🐳</span>
        <h1 className={styles.heroTitle}>
          <span className="gradient-text">Docker</span>
          {locale === 'ja' ? ' を楽しく学ぼう' : ' Learning Adventure'}
        </h1>
        <p className={styles.heroSub}>
          {locale === 'ja'
            ? 'ハンズオン形式でDocker & Docker Composeを基礎からマスター。ゲーム感覚で楽しく続けられるインタラクティブ学習プラットフォーム。'
            : 'Master Docker & Docker Compose through interactive hands-on lessons. A gamified learning platform that makes Docker fun.'}
        </p>
      </section>

      {/* Course Cards */}
      <section className={styles.courseGrid}>
        {COURSES.map((course) => {
          const curriculum = t.curriculum[course.id as keyof typeof t.curriculum];
          return (
            <Link key={course.id} href={course.href} className={styles.courseCard}>
              <span className={`${styles.courseLevel} ${styles[course.levelClass]}`}>
                {course.levelLabel[locale]}
              </span>
              <span className={styles.courseIcon}>{course.icon}</span>
              <h2 className={styles.courseTitle}>{curriculum.title}</h2>
              <p className={styles.courseDesc}>{curriculum.description}</p>
              <div className={styles.courseProgress}>
                <div className={styles.courseProgressTrack}>
                  <div className={styles.courseProgressFill} style={{ width: '0%' }} />
                </div>
                <span className={styles.courseProgressText}>0/{course.chapters}</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Features */}
      <section className={styles.features}>
        {FEATURES.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <div className={styles.featureTitle}>{f.title[locale]}</div>
            <div className={styles.featureDesc}>{f.desc[locale]}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <Link href="/guide/1" className={styles.ctaButton}>
          🚀 {t.common.start}
        </Link>
      </section>
    </div>
  );
}
