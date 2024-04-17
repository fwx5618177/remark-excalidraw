import { expect } from 'chai';
import { describe, it } from 'mocha';
import { BrowserHttpStrategy } from 'src/http/BrowserHttpStrategy';
import { NodeHttpStrategy } from 'src/http/NodeHttpStrategy';
import { RuntimeFactory } from 'src/http/RuntimeFactory';

describe('RuntimeFactory', function () {
    it('should return the same instance of RuntimeFactory', function () {
        const instance1 = RuntimeFactory.getInstance();
        const instance2 = RuntimeFactory.getInstance();
        expect(instance1).to.equal(instance2);
    });

    it('should initialize HttpAdapter based on environment', function () {
        const adapter = RuntimeFactory.getHttpAdapter();
        const expectedAdapterType =
            typeof window !== 'undefined' ? BrowserHttpStrategy : NodeHttpStrategy;
        expect(adapter).to.be.an.instanceof(expectedAdapterType);
    });

    it('should throw an error if HttpAdapter is accessed before initialization', function () {
        delete RuntimeFactory['instance'];
        delete RuntimeFactory['httpAdapter'];

        expect(() => RuntimeFactory.getHttpAdapter()).to.throw(
            'HttpAdapter has not been initialized.',
        );
    });
});
