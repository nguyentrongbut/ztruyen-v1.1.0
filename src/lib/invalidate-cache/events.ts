export const COMMENT_REFRESH_EVENT = 'comment-refresh'
export const NOTIFICATION_REFRESH_EVENT = 'notification-refresh'

export function dispatchCommentRefresh() {
    window.dispatchEvent(new Event(COMMENT_REFRESH_EVENT))
}

export function dispatchNotificationRefresh() {
    window.dispatchEvent(new Event(NOTIFICATION_REFRESH_EVENT))
}