import { HttpOptions } from 'remark-excalidraw';

import { BaseHttpStrategy } from './BaseHttpStrategy';

export class BrowserHttpStrategy extends BaseHttpStrategy {
    override async requestProvider<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        if (response.status !== 200 || !response.ok) {
            return this.getDefaultValue<T>();
        }

        return response.json();
    }

    override async request(url: string, options?: HttpOptions | undefined): Promise<Response> {
        const response = await fetch(url, options);

        return response;
    }
}
