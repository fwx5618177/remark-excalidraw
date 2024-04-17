import { HttpOptions } from 'remark-excalidraw';

export abstract class HttpAdapter {
    abstract request<T>(url: string, options?: HttpOptions): Promise<T>;
}
