import { expect } from 'chai';
import { describe, it } from 'mocha';
import { BaseContentStrategy } from 'src/strategies/BaseContentStrategy';
import { StrategyFactory } from 'src/strategies/StrategyFactory';

class MockStrategy extends BaseContentStrategy {
    handleContent(data: any): string {
        return data;
    }
}

describe('Strategy', () => {
    it('StrategyFactory should follow singleton pattern', () => {
        const instance1 = StrategyFactory.getInstance();
        const instance2 = StrategyFactory.getInstance();

        expect(instance1).to.equal(instance2);
    });

    it('should allow setting and getting a strategy', () => {
        const factory = StrategyFactory.getInstance();
        const mockStrategy = new MockStrategy();
        factory.strategyInstance = mockStrategy;
        expect(factory.strategyInstance).to.equal(mockStrategy);
    });

    it('should throw an error if trying to get a strategy that is not set', () => {
        const factory = StrategyFactory.getInstance();
        factory.strategyInstance = undefined as any; // explicitly clear strategy
        expect(() => factory.strategyInstance).to.throw('not set strategy');
    });

    it('should throw an error if trying to process data without a strategy set', () => {
        const factory = StrategyFactory.getInstance();
        factory.strategyInstance = undefined as any; // clear strategy to simulate this test case
        expect(() => factory.process('Some data')).to.throw('not set strategy');
    });

    it('should process data correctly using the set strategy', () => {
        const factory = StrategyFactory.getInstance();
        const mockStrategy = new MockStrategy();
        factory.strategyInstance = mockStrategy;

        // Here we are not actually testing console output, just that no error is thrown
        expect(() => factory.process('Hello, world!')).to.not.throw();
    });

    it('should return the correct strategy', () => {
        const factory = StrategyFactory.getInstance();
        factory.strategyInstance = new MockStrategy();
        factory.process('Hello, world!');

        expect(factory.strategyInstance).to.be.instanceOf(MockStrategy);
        expect(factory.strategyInstance.handleContent('Hello, world!')).to.equal('Hello, world!');
    });
});
