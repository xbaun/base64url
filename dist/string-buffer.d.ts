export interface IBuffer {
    readonly length: number;
}
export interface IStringBuffer extends IBuffer {
    fill(str: string, offset: number, encoding?: string): void;
    set(str: string, offset: number, encoding?: string): void;
    toString(encoding?: string): string;
}
export declare abstract class StringBuffer<TBuffer extends IBuffer> implements IStringBuffer {
    private buf;
    static from(str: string, encoding?: 'utf8' | 'base64'): IStringBuffer;
    static alloc(length: number): IStringBuffer;
    protected constructor(buf: TBuffer);
    abstract fill(str: string, offset: number, encoding?: string): void;
    abstract set(str: string, offset: number, encoding?: string): void;
    readonly length: number;
    private static TypedArray;
    private static NodeBuffer;
}
