export const REFRESH_EVENT = 'refresh'

export function dispatchRefresh() {
    window.dispatchEvent(new Event(REFRESH_EVENT))
}