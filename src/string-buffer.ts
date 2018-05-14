export interface IBuffer {

    readonly length: number;

}

export interface IStringBuffer extends IBuffer {

    fill(str: string, offset: number, encoding?: string): void;

    set (str: string, offset: number, encoding?: string): void;

    toString(encoding?: string): string;

}

/**
 * An isomorphic {@link StringBuffer} implementation.
 */
export abstract class StringBuffer<TBuffer extends IBuffer> implements IStringBuffer {

    public static from(str: string, encoding: 'utf8' | 'base64' = 'utf8'): IStringBuffer {

        let length;

        if (encoding == 'base64') {
            length = Math.trunc(str.indexOf('=') * 6 / 8);
        } else {
            length = str.length;
        }

        let buf = StringBuffer.alloc(length);
        buf.set(str, 0, encoding);
        return buf;
    }

    public static alloc(length: number): IStringBuffer {

        if (typeof Buffer !== 'undefined') {
            return new StringBuffer.NodeBuffer(length);
        }

        if (typeof Uint16Array !== 'undefined') {
            return new StringBuffer.TypedArray(length);
        }

        throw new Error("Unsupported buffers");
    }


    protected constructor(private buf: TBuffer) { }


    abstract fill(str: string, offset: number, encoding?: string): void;

    abstract set (str: string, offset: number, encoding?: string): void;

    get length() {
        return this.buf.length;
    }


    private static TypedArray = class extends StringBuffer<Uint16Array> {

        constructor(length: number) {
            super(new Uint16Array(length));
        }

        fill(str: string, offset: number, encoding?: string): void {

            if (encoding == 'base64') {
                str = atob(str);
            }

            this.buf.fill(str.charCodeAt(0), offset);
        }

        set(str: string, offset: number, encoding?: string): void {

            if (encoding == 'base64') {
                str = atob(str);
            }

            this.buf.set(str.split('').map(s => s.charCodeAt(0)), offset);
        }

        toString(encoding: string): string {

            const str = String.fromCharCode.apply(null, this.buf);

            if (encoding == 'base64') {
                return btoa(str);
            }

            return str;
        }

    };

    private static NodeBuffer = class extends StringBuffer<Buffer> {

        constructor(length: number) {
            super(Buffer.alloc(length));
        }

        fill(str: string, offset: number, encoding?: string): void {
            this.buf.fill(str[0], offset, this.length, encoding);
        }

        set(str: string, offset: number, encoding?: string): void {
            this.buf.write(str, offset, str.length, encoding);
        }

        toString(encoding: string): string {
            return this.buf.toString(encoding);
        }
    }

}
