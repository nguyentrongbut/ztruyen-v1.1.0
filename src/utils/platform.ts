/**
 * Detect iOS device (iPhone / iPad / iPod)
 */
export function isIOSDevice(): boolean {
    if (typeof navigator === 'undefined') return false
    return /iP(hone|ad|od)/.test(navigator.userAgent)
}

/**
 * Detect PWA standalone mode
 * - navigator.standalone: Safari-specific property (iOS PWA)
 * - display-mode: standalone: standard CSS media query (Android / desktop PWA)
 */
export function isStandalone(): boolean {
    if (typeof window === 'undefined') return false

    const nav = navigator as Navigator & { standalone?: boolean }

    return (
        nav.standalone === true ||
        window.matchMedia('(display-mode: standalone)').matches
    )
}

/**
 * Returns true on iOS Safari browser (NOT PWA).
 * FCM / Service Worker is unstable in this environment.
 */
export function isIOSSafariBrowser(): boolean {
    return isIOSDevice() && !isStandalone()
}