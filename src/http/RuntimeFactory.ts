import { HttpStrategy } from 'remark-excalidraw';

import { BrowserHttpStrategy } from './BrowserHttpStrategy';
import { NodeHttpStrategy } from './NodeHttpStrategy';

export class RuntimeFactory {
    private static instance?: RuntimeFactory;
    private static httpStrategy?: HttpStrategy;

    private constructor() {
        RuntimeFactory.httpStrategy = this.determineRuntime();
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

    public static getHttpStrategy(): HttpStrategy {
        if (!this.httpStrategy) {
            RuntimeFactory.getInstance();
        }

        if (!this.httpStrategy) {
            throw new Error('HttpStrategy has not been initialized.');
        }

        return this.httpStrategy!;
    }
}
