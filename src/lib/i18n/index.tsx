'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ja, { TranslationKeys } from './translations/ja';
import en from './translations/en';

export type Locale = 'ja' | 'en';
export type OSType = 'windows' | 'mac';

interface I18nContextType {
    locale: Locale;
    os: OSType;
    t: TranslationKeys;
    setLocale: (locale: Locale) => void;
    setOS: (os: OSType) => void;
    toggleLocale: () => void;
    toggleOS: () => void;
}

const translations: Record<Locale, TranslationKeys> = { ja, en };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getInitialLocale(): Locale {
    if (typeof window === 'undefined') return 'ja';
    return (localStorage.getItem('dq-locale') as Locale) || 'ja';
}

function getInitialOS(): OSType {
    if (typeof window === 'undefined') return 'windows';
    const saved = localStorage.getItem('dq-os') as OSType;
    if (saved) return saved;
    // Auto-detect from user agent
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('mac') ? 'mac' : 'windows';
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
    const [os, setOSState] = useState<OSType>(getInitialOS);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('dq-locale', newLocale);
    }, []);

    const setOS = useCallback((newOS: OSType) => {
        setOSState(newOS);
        localStorage.setItem('dq-os', newOS);
    }, []);

    const toggleLocale = useCallback(() => {
        setLocale(locale === 'ja' ? 'en' : 'ja');
    }, [locale, setLocale]);

    const toggleOS = useCallback(() => {
        setOS(os === 'windows' ? 'mac' : 'windows');
    }, [os, setOS]);

    const value: I18nContextType = {
        locale,
        os,
        t: translations[locale],
        setLocale,
        setOS,
        toggleLocale,
        toggleOS,
    };

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}
