import { HttpOptions } from 'remark-excalidraw';

import { HttpAdapter } from './HttpAdapter';

export class BrowserHttpAdapter extends HttpAdapter {
    override async request<T>(url: string, options?: HttpOptions): Promise<T> {
        const response = await fetch(url, options);

        return response.json();
    }
}
