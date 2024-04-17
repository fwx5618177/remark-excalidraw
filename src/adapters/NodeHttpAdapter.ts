import { HttpOptions } from 'remark-excalidraw';
import fetch from 'node-fetch';

import { HttpAdapter } from './HttpAdapter';

export class NodeHttpAdapter extends HttpAdapter {
    override async request<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        return response.json() as T;
    }
}
