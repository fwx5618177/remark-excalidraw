import { ContentStrategy } from 'remark-excalidraw';

import { BaseContentStrategy } from './BaseContentStrategy';

export class StrategyFactory {
    private static instance: StrategyFactory;
    private strategy?: ContentStrategy;

    constructor() {}

    public static getInstance(): StrategyFactory {
        if (!StrategyFactory.instance) {
            StrategyFactory.instance = new StrategyFactory();
        }

        return StrategyFactory.instance;
    }

    set strategyInstance(strategy: ContentStrategy) {
        this.strategy = strategy;
    }

    get strategyInstance(): ContentStrategy {
        if (!this.strategy) throw new Error('not set strategy');

        return this.strategy;
    }

    public process(data: any) {
        if (!this.strategy) throw new Error('not set strategy');

        (this.strategy as BaseContentStrategy).process(data);
    }
}
