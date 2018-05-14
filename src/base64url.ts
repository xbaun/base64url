import { StringBuffer } from './string-buffer';

/**
 * Escape a "base64" string to its "base64url" representation.
 * @param {string} base64Str The "base64" input string.
 * @returns {string} The "base64url" string.
 */
export function escape(base64Str: string): string {
    return base64Str
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

/**
 * Unescape a "base64Url" string to its "base64" representation.
 * @param {string | Buffer} base64url The "base64url" input string.
 * @param {string} encoding The same as for {@link Buffer#toString}.
 * @returns {string} The "base64" string.
 */
export function unescape(base64url: string, encoding = 'utf8'): string {

    const length = base64url.length;

    let padding = 3 - (length + 3) % 4;
    let decoded = StringBuffer.alloc(base64url.length + padding);

    decoded.set (base64url, 0, encoding);
    decoded.fill('=', length, encoding);

    return decoded.toString(encoding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
}

/**
 * Encode an input string to "base64url" representation.
 * @param {string | Buffer} value The input string to encode.
 * @param {string} encoding The same as for {@link Buffer#toString}.
 * @returns {string} The "base64url" encoded string.
 */
export function encode(value: string, encoding = 'utf8'): string {
    return escape(StringBuffer.from(value).toString('base64'));
}

/**
 * Decode a "base64url" string.
 * @param {string | Buffer} value The "base64url" string to decode.
 * @param {string} encoding The same as for {@link Buffer#toString}.
 * @returns {string} The decoded representation of the "base64url" string.
 */
export function decode(value: string, encoding = 'utf8'): string {
    return StringBuffer.from(unescape(value, encoding),'base64').toString(encoding);
}