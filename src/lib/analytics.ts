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
 * Gets the current attempt index from storage.
 * 1 = first time, 2+ = retry
 */
export const getAttemptIndex = (): number => {
    if (typeof window === 'undefined') return 1;
    const stored = localStorage.getItem('ws_attempt_index');
    return stored ? parseInt(stored, 10) : 1;
};

/**
 * Increments the attempt index (called on test start).
 */
export const incrementAttemptIndex = () => {
    if (typeof window === 'undefined') return;
    const current = getAttemptIndex();
    localStorage.setItem('ws_attempt_index', (current + 1).toString());
};

/**
 * Basic device type detection
 */
export const getDeviceType = (): 'mobile' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop';
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};

/**
 * Tracks a custom event in GA4.
 * Automatically injects attempt_index and device_type.
 * Use this instead of direct window.gtag calls for type safety and consistency.
 */
export const trackEvent = (event_name: EventName, properties?: EventProperties) => {
    if (typeof window !== 'undefined' && window.gtag) {
        try {
            const payload = {
                ...properties,
                attempt_index: getAttemptIndex(),
                device_type: getDeviceType()
            };

            window.gtag('event', event_name, payload);

            // Also log to console in development for easier debugging
            if (import.meta.env.MODE === 'development') {
                console.log(`[GA4 Tracking]: ${event_name}`, payload);
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
