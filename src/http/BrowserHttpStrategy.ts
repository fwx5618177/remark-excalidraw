import { HttpOptions } from 'remark-excalidraw';

import { BaseHttpStrategy } from './BaseHttpStrategy';

export class BrowserHttpStrategy extends BaseHttpStrategy {
    override async request<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        return response.json();
    }
}
