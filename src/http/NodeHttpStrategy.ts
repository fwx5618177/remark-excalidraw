import { HttpOptions } from 'remark-excalidraw';
import fetch from 'node-fetch';

import { BaseHttpStrategy } from './BaseHttpStrategy';

export class NodeHttpStrategy extends BaseHttpStrategy {
    override async request<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        return response.json() as T;
    }
}
