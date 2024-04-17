import { HttpStrategy } from 'remark-excalidraw';

import { BrowserHttpStrategy } from './BrowserHttpStrategy';
import { NodeHttpStrategy } from './NodeHttpStrategy';

export class RuntimeFactory {
    private static instance?: RuntimeFactory;
    private static httpAdapter?: HttpStrategy;

    private constructor() {
        RuntimeFactory.httpAdapter = this.determineRuntime();
    }

    private determineRuntime(): HttpStrategy {
        return typeof window !== 'undefined' ? new BrowserHttpStrategy() : new NodeHttpStrategy();
    }

    public static getInstance(): RuntimeFactory {
        if (!RuntimeFactory.instance) {
            RuntimeFactory.instance = new RuntimeFactory();
        }

        return RuntimeFactory.instance;
    }

    public static getHttpAdapter(): HttpStrategy {
        if (!this.httpAdapter) throw new Error('HttpAdapter has not been initialized.');

        return this.httpAdapter;
    }
}
