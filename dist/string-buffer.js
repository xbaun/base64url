"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuffer = (function () {
    function StringBuffer(buf) {
        this.buf = buf;
    }
    StringBuffer.from = function (str, encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        var buf = StringBuffer.alloc(str.length);
        buf.set(str, 0, encoding);
        return buf;
    };
    StringBuffer.alloc = function (length) {
        if (typeof Buffer !== 'undefined') {
            return new StringBuffer.NodeBuffer(length);
        }
        if (typeof Uint16Array !== 'undefined') {
            return new StringBuffer.TypedArray(length);
        }
        throw new Error("Unsupported buffers");
    };
    Object.defineProperty(StringBuffer.prototype, "length", {
        get: function () {
            return this.buf.length;
        },
        enumerable: true,
        configurable: true
    });
    StringBuffer.TypedArray = (function (_super) {
        __extends(class_1, _super);
        function class_1(length) {
            return _super.call(this, new Uint16Array(length)) || this;
        }
        class_1.prototype.fill = function (str, offset, encoding) {
            if (encoding == 'base64') {
                str = atob(str);
            }
            this.buf.fill(str.charCodeAt(0), offset);
        };
        class_1.prototype.set = function (str, offset, encoding) {
            this.buf.set(str.split('').map(function (s) { return s.charCodeAt(0); }), offset);
        };
        class_1.prototype.toString = function (encoding) {
            var str = String.fromCharCode.apply(null, this.buf);
            if (encoding == 'base64') {
                return btoa(str);
            }
            return str;
        };
        return class_1;
    }(StringBuffer));
    StringBuffer.NodeBuffer = (function (_super) {
        __extends(class_2, _super);
        function class_2(length) {
            return _super.call(this, Buffer.alloc(length)) || this;
        }
        class_2.prototype.fill = function (str, offset, encoding) {
            this.buf.fill(str[0], offset, this.length, encoding);
        };
        class_2.prototype.set = function (str, offset, encoding) {
            this.buf.write(str, offset, str.length, encoding);
        };
        class_2.prototype.toString = function (encoding) {
            return this.buf.toString(encoding);
        };
        return class_2;
    }(StringBuffer));
    return StringBuffer;
}());
exports.StringBuffer = StringBuffer;
