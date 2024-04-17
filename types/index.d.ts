declare module 'remark-excalidraw' {
    import { Node } from 'unist';

    type Options = {
        mode?: 'iframe' | 'metadata';
        runtime?: 'node' | 'browser';
    };

    interface CodeNode extends Node {
        lang: string;
        meta: string;
        value: string;
        data?: {
            hProperties?: {
                [key: string]: any;
            };
        };
    }

    type HttpOptions = {
        method: 'post' | 'get';
        headers: Record<string, string>;
        body?: any;
    };

    interface HttpStrategy {
        request<T>(url: string, options?: HttpOptions): Promise<T>;
    }

    interface ContentStrategy {
        handleContent(content: string): string;
    }
}
