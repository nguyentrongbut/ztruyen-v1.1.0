import {
    getFirebaseMessaging,
    getToken,
    deleteToken,
    VAPID_KEY,
} from '@/lib/firebase';
import { UserService } from '@/services/api/user';

const FCM_TOKEN_KEY = 'fcm_token';

function buildSwUrl(): string {
    const url = new URL('/firebase-messaging-sw.js', location.origin);
    url.searchParams.set('apiKey', process.env.NEXT_PUBLIC_FIREBASE_API_KEY!);
    url.searchParams.set('authDomain', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!);
    url.searchParams.set('projectId', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!);
    url.searchParams.set('storageBucket', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!);
    url.searchParams.set('messagingSenderId', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!);
    url.searchParams.set('appId', process.env.NEXT_PUBLIC_FIREBASE_APP_ID!);
    return url.toString();
}

export async function initFCM(): Promise<void> {
    try {
        if (typeof window === 'undefined') return;
        if (!('serviceWorker' in navigator)) return;

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.warn('[FCM] Permission denied');
            return;
        }

        const registration = await navigator.serviceWorker.register(buildSwUrl());
        await navigator.serviceWorker.ready;

        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration,
        });

        if (!token) {
            console.warn('[FCM] No token received');
            return;
        }

        const savedToken = localStorage.getItem(FCM_TOKEN_KEY);

        // Token không đổi thì không cần gọi API lại
        if (savedToken === token) return;

        localStorage.setItem(FCM_TOKEN_KEY, token);

        await Promise.all([
            UserService.saveFcmToken(token),
            UserService.subscribeToTopic(token, 'global'),
        ]);

        console.log('[FCM] initFCM success');
    } catch (err) {
        console.error('[FCM] initFCM failed:', err);
    }
}

export async function destroyFCM(): Promise<void> {
    try {
        const token = localStorage.getItem(FCM_TOKEN_KEY);
        if (!token) return;

        await Promise.all([
            UserService.removeFcmToken(token),
            UserService.unsubscribeFromTopic(token, 'global'),
        ]);

        const messaging = getFirebaseMessaging();
        if (messaging) await deleteToken(messaging);

        localStorage.removeItem(FCM_TOKEN_KEY);

        console.log('[FCM] destroyFCM success');
    } catch (err) {
        console.error('[FCM] destroyFCM failed:', err);
    }
}

export function getSavedFcmToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(FCM_TOKEN_KEY);
}