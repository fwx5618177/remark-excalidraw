import { BrowserHttpAdapter } from './BrowserHttpAdapter';
import { HttpAdapter } from './HttpAdapter';
import { NodeHttpAdapter } from './NodeHttpAdapter';

export class RuntimeFactory {
    private static instance: RuntimeFactory;

    constructor() {}

    public static getInstance(): RuntimeFactory {
        if (!RuntimeFactory.instance) {
            RuntimeFactory.instance = new RuntimeFactory();
        }

        return RuntimeFactory.instance;
    }

    static getHttpAdapter(): HttpAdapter {
        const isBrowser = typeof window !== 'undefined';

        if (isBrowser) {
            return new BrowserHttpAdapter();
        } else {
            return new NodeHttpAdapter();
        }
    }
}
