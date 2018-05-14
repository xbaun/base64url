"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringBuffer {
    constructor(buf) {
        this.buf = buf;
    }
    static from(str, encoding = 'utf8') {
        let length;
        if (encoding == 'base64') {
            length = Math.trunc(str.indexOf('=') * 6 / 8);
        }
        else {
            length = str.length;
        }
        let buf = StringBuffer.alloc(length);
        buf.set(str, 0, encoding);
        return buf;
    }
    static alloc(length) {
        if (typeof Buffer !== 'undefined') {
            return new StringBuffer.NodeBuffer(length);
        }
        if (typeof Uint16Array !== 'undefined') {
            return new StringBuffer.TypedArray(length);
        }
        throw new Error("Unsupported buffers");
    }
    get length() {
        return this.buf.length;
    }
}
StringBuffer.TypedArray = class extends StringBuffer {
    constructor(length) {
        super(new Uint16Array(length));
    }
    fill(str, offset, encoding) {
        if (encoding == 'base64') {
            str = atob(str);
        }
        this.buf.fill(str.charCodeAt(0), offset);
    }
    set(str, offset, encoding) {
        this.buf.set(str.split('').map(s => s.charCodeAt(0)), offset);
    }
    toString(encoding) {
        const str = String.fromCharCode.apply(null, this.buf);
        if (encoding == 'base64') {
            return btoa(str);
        }
        return str;
    }
};
StringBuffer.NodeBuffer = class extends StringBuffer {
    constructor(length) {
        super(Buffer.alloc(length));
    }
    fill(str, offset, encoding) {
        this.buf.fill(str[0], offset, this.length, encoding);
    }
    set(str, offset, encoding) {
        this.buf.write(str, offset, str.length, encoding);
    }
    toString(encoding) {
        return this.buf.toString(encoding);
    }
};
exports.StringBuffer = StringBuffer;
