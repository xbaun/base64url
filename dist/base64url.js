"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_buffer_1 = require("./string-buffer");
function escape(base64Str) {
    return base64Str
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
exports.escape = escape;
function unescape(base64url, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    var length = base64url.length;
    var padding = 3 - (length + 3) % 4;
    var decoded = string_buffer_1.StringBuffer.alloc(base64url.length + padding);
    decoded.set(base64url, 0, encoding);
    decoded.fill('=', length, encoding);
    return decoded.toString(encoding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
}
exports.unescape = unescape;
function encode(value, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return escape(string_buffer_1.StringBuffer.from(value).toString('base64'));
}
exports.encode = encode;
function decode(value, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return string_buffer_1.StringBuffer.from(unescape(value, encoding), 'base64').toString(encoding);
}
exports.decode = decode;
