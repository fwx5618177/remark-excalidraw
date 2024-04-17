import { HttpOptions, HttpStrategy } from 'remark-excalidraw';

export abstract class BaseHttpStrategy implements HttpStrategy {
    abstract request<T>(url: string, options?: HttpOptions): Promise<T>;
}
