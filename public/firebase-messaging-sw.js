importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

// Background push — app đóng hoặc tab ẩn
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title ?? 'Thông báo mới';
    const body = payload.notification?.body ?? '';
    const data = payload.data ?? {};

    self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/badge.png',  // icon nhỏ trên thanh status bar (Android)
        data,
    });
});

// Click vào notification → mở đúng trang
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

