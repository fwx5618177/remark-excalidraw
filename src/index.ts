import { Providers, TextNode, Options } from 'remark-excalidraw';
import { visit } from 'unist-util-visit';

import { RuntimeFactory } from './http/RuntimeFactory';
import { COMMON } from './constants';

const remarkSandpack = (options: Options) => {
    return async (tree: TextNode) => {
        const providers = await RuntimeFactory.getHttpStrategy().request<Providers>(
            COMMON.OEMBED_PROVIDERS_URL,
        );

        const ctx = {
            ...options,
            providers,
        };

        visit(tree, 'text', (node: TextNode) => {});
    };
};

export default remarkSandpack;
