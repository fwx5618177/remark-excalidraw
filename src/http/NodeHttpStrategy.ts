import { HttpOptions } from 'remark-excalidraw';
import fetch, { Response } from 'node-fetch';

import { BaseHttpStrategy } from './BaseHttpStrategy';

export class NodeHttpStrategy extends BaseHttpStrategy {
    override async requestProvider<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        if (response.status !== 200 || !response.ok) {
            return this.getDefaultValue<T>();
        }

        return response.json() as T;
    }

    override async request(url: string, options?: HttpOptions): Promise<Response> {
        const response = await fetch(url, options);

        return response;
    }
}
