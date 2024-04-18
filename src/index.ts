import { Providers, TextNode, Options } from 'remark-excalidraw';
import { visit } from 'unist-util-visit';

import { RuntimeFactory } from './http/RuntimeFactory';
import { COMMON } from './constants';
import { HelperFactory } from './helpers/HelperFactory';

const remarkExcalidraw = (options: Options) => {
    return async (tree: TextNode) => {
        RuntimeFactory.getInstance();

        const providers = await RuntimeFactory.getHttpStrategy().requestProvider<Providers>(
            COMMON.OEMBED_PROVIDERS_URL,
        );

        const ctx = {
            ...options,
            providers: [...providers, ...COMMON.DEFAULT_DRAW_PROVIDER],
        };

        visit(tree, 'text', (node: TextNode) => {
            Promise.all([HelperFactory.getInstance().process(ctx, node)]);
        });
    };
};

export default remarkExcalidraw;
