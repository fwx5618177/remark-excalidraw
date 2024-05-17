import { expect } from 'chai';
import { describe, it } from 'mocha';
// import { COMMON } from 'src/constants';

import { BrowserHttpStrategy } from '../src/http/BrowserHttpStrategy';
import { NodeHttpStrategy } from '../src/http/NodeHttpStrategy';
import { RuntimeFactory } from '../src/http/RuntimeFactory';

describe('RuntimeFactory', function () {
    it('should return the same instance of RuntimeFactory', function () {
        const instance1 = RuntimeFactory.getInstance();
        const instance2 = RuntimeFactory.getInstance();
        expect(instance1).to.equal(instance2);
    });

    it('should initialize HttpStrategy based on environment', function () {
        const adapter = RuntimeFactory.getHttpStrategy();
        const expectedAdapterType =
            typeof window !== 'undefined' ? BrowserHttpStrategy : NodeHttpStrategy;
        expect(adapter).to.be.an.instanceof(expectedAdapterType);
    });

    // describe('BrowserHttpStrategy', function () {
    //     this.beforeAll(function () {
    //         global.window = {} as any;
    //     });

    //     this.afterAll(function () {
    //         delete RuntimeFactory['instance'];
    //         delete RuntimeFactory['httpStrategy'];

    //         global.window = undefined as any;
    //     });

    //     it('should return a JSON response', async function () {
    //         expect(() => RuntimeFactory.getHttpStrategy()).to.throw(
    //             'HttpStrategy has not been initialized.',
    //         );

    //         const instance = RuntimeFactory.getInstance();
    //         expect(instance).to.be.an.instanceof(RuntimeFactory);

    //         const strategy = RuntimeFactory.getHttpStrategy();
    //         expect(strategy).to.be.an.instanceof(BrowserHttpStrategy);

    //         const response = await strategy.requestProvider<{
    //             title: string;
    //             body: string;
    //         }>('https://jsonplaceholder.typicode.com/posts/1');

    //         expect(response).to.have.property('title');
    //         expect(response).to.have.property('body');
    //         expect(response.title).to.be.a('string');
    //         expect(response.body).to.be.a('string');
    //     });

    //     it('should return constant oembed response', async function () {
    //         const strategy = RuntimeFactory.getHttpStrategy();
    //         const response = await strategy.requestProvider<
    //             Array<{
    //                 provider_name: string;
    //                 provider_url: string;
    //                 endpoints: {
    //                     schemes: string[];
    //                     url: string;
    //                 }[];
    //             }>
    //         >(COMMON.OEMBED_PROVIDERS_URL);

    //         expect(response).to.be.an('array');
    //         expect(response).to.have.length.greaterThan(0);
    //         expect(response[0]).to.have.property('provider_name');
    //         expect(response[0]).to.have.property('provider_url');
    //         expect(response[0]).to.have.property('endpoints');
    //         expect(response[0]?.endpoints).to.be.an('array');
    //         expect(response[0]?.endpoints).to.have.length.greaterThan(0);
    //         expect(response[0]?.endpoints[0]).to.have.property('schemes');
    //         expect(response[0]?.endpoints[0]).to.have.property('url');
    //     });
    // });

    // describe('NodeHttpStrategy', function () {
    //     it('should return a JSON response', async function () {
    //         expect(() => RuntimeFactory.getHttpStrategy()).to.throw(
    //             'HttpStrategy has not been initialized.',
    //         );

    //         const instance = RuntimeFactory.getInstance();
    //         expect(instance).to.be.an.instanceof(RuntimeFactory);

    //         const strategy = RuntimeFactory.getHttpStrategy();
    //         expect(strategy).to.be.an.instanceof(NodeHttpStrategy);

    //         const response = await strategy.requestProvider<{
    //             title: string;
    //             body: string;
    //         }>('https://jsonplaceholder.typicode.com/posts/1');

    //         expect(response).to.have.property('title');
    //         expect(response).to.have.property('body');
    //         expect(response.title).to.be.a('string');
    //         expect(response.body).to.be.a('string');
    //     });

    //     it('should return constant oembed response', async function () {
    //         const strategy = RuntimeFactory.getHttpStrategy();
    //         const response = await strategy.requestProvider<
    //             Array<{
    //                 provider_name: string;
    //                 provider_url: string;
    //                 endpoints: {
    //                     schemes: string[];
    //                     url: string;
    //                 }[];
    //             }>
    //         >(COMMON.OEMBED_PROVIDERS_URL);

    //         expect(response).to.be.an('array');
    //         expect(response).to.have.length.greaterThan(0);
    //         expect(response[0]).to.have.property('provider_name');
    //         expect(response[0]).to.have.property('provider_url');
    //         expect(response[0]).to.have.property('endpoints');
    //         expect(response[0]?.endpoints).to.be.an('array');
    //         expect(response[0]?.endpoints).to.have.length.greaterThan(0);
    //         expect(response[0]?.endpoints[0]).to.have.property('schemes');
    //         expect(response[0]?.endpoints[0]).to.have.property('url');
    //     });
    // });
});
