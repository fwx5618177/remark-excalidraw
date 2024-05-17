import type { ContentStrategy, TextNode } from 'type';

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

    set node(node: TextNode) {
        this.node = node;
    }

    set strategyInstance(strategy: ContentStrategy) {
        this.strategy = strategy;
    }

    get strategyInstance(): ContentStrategy {
        if (!this.strategy) throw new Error('not set strategy');

        return this.strategy;
    }

    public process(node: TextNode, data: any) {
        if (!this.strategy) throw new Error('not set strategy');

        (this.strategy as BaseContentStrategy).process(node, data);
    }
}
