/**
 * WeddingScore GA4 Analytics Wrapper
 * Ensures every event follows a strict schema for decision-grade analytics.
 */

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

type EventName =
    | 'landing_view'
    | 'start_test'
    | 'survey_question_view'
    | 'survey_answer_select'
    | 'survey_next'
    | 'survey_drop'
    | 'analyzing_view'
    | 'analyzing_exit'
    | 'result_view'
    | 'result_cta_click';

interface EventProperties {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Tracks a custom event in GA4.
 * Use this instead of direct window.gtag calls for type safety and consistency.
 */
export const trackEvent = (event_name: EventName, properties?: EventProperties) => {
    if (typeof window !== 'undefined' && window.gtag) {
        try {
            window.gtag('event', event_name, properties);

            // Also log to console in development for easier debugging
            if (import.meta.env.MODE === 'development') {
                console.log(`[GA4 Tracking]: ${event_name}`, properties);
            }
        } catch (e) {
            console.error('[GA4 Tracking Error]:', e);
        }
    }
};

/**
 * Utility to identify entry source for landing_view
 */
export const getEntrySource = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    if (utmSource) return utmSource;

    const referrer = document.referrer;
    if (!referrer) return 'direct';
    if (referrer.includes('facebook.com') || referrer.includes('instagram.com')) return 'sns';
    if (referrer.includes('google.com') || referrer.includes('naver.com')) return 'search';

    return 'others';
};
