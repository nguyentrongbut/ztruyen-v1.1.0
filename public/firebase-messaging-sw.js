importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

const params = new URL(location.href).searchParams;

firebase.initializeApp({
    apiKey: params.get('apiKey'),
    authDomain: params.get('authDomain'),
    projectId: params.get('projectId'),
    storageBucket: params.get('storageBucket'),
    messagingSenderId: params.get('messagingSenderId'),
    appId: params.get('appId'),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title ?? 'Thông báo mới';
    const body = payload.notification?.body ?? '';
    const data = payload.data ?? {};

    self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/badge.png',
        data,
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const data = event.notification.data ?? {};
    let url = '/';

    if (data.type === 'REPLY_COMMENT' || data.type === 'LIKE_COMMENT') {
        if (data.comicSlug && data.chapterId) {
            url = `/truyen-tranh/${data.comicSlug}.html`;
        }
    }

    if (data.type === 'ANNOUNCEMENT') {
        url = '/';
    }

    event.waitUntil(
        clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    if ('focus' in client) return client.focus();
                }
                return clients.openWindow(url);
            })
    );
});