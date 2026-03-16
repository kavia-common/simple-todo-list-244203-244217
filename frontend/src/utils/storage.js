/**
 * @fileoverview Small helpers for JSON localStorage access.
 */

/**
 * Reads a JSON value from localStorage.
 * @param {string} key Storage key.
 * @param {*} fallback Value to return on missing/invalid data.
 * @return {*} The parsed value or fallback.
 */
export function readJson(key, fallback) {
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }
        return JSON.parse(raw);
    } catch (error) {
        return fallback;
    }
}

/**
 * Writes a JSON value to localStorage.
 * @param {string} key Storage key.
 * @param {*} value JSON-serializable value.
 */
export function writeJson(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Ignore storage failures (private mode/quota/etc.).
    }
}
