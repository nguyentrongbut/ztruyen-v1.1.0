import {
    getFirebaseMessaging,
    getToken,
    deleteToken,
    VAPID_KEY,
} from '@/lib/firebase';
import { UserService } from '@/services/api/user';

const FCM_TOKEN_KEY = 'fcm_token';

export async function initFCM(): Promise<void> {
    try {
        if (typeof window === 'undefined') return;
        if (!('serviceWorker' in navigator)) return;

        // ── 1. Xin quyền notification ──
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.warn('[FCM] Permission denied');
            return;
        }

        // ── 2. Register SW + chờ active ──
        const registration = await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js'
        );
        await navigator.serviceWorker.ready;

        // ── 3. Lấy messaging instance ──
        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        // ── 4. Lấy FCM token ──
        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration,
        });

        if (!token) {
            console.warn('[FCM] No token received');
            return;
        }

        localStorage.setItem(FCM_TOKEN_KEY, token);

        // ── 5. Lưu token + subscribe topic global ──
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

        // ── Xóa token + unsubscribe topic global ──
        await Promise.all([
            UserService.removeFcmToken(token),
            UserService.unsubscribeFromTopic(token, 'global'),
        ]);

        // ── Xóa khỏi Firebase ──
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