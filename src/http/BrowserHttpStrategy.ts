import { HttpOptions } from 'remark-excalidraw';

import { BaseHttpStrategy } from './BaseHttpStrategy';

export class BrowserHttpStrategy extends BaseHttpStrategy {
    override async request<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        if (response.status !== 200 || !response.ok) {
            return this.getDefaultValue<T>();
        }

        return response.json();
    }
}
