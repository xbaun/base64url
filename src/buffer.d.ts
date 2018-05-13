/**
 * Workaround for the correct function signature:
 *   https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding
 */

export {}

declare global {
    interface NodeBuffer {
        fill(value: string, offset?: number, end?: number, encoding?: string): void;
    }
}
