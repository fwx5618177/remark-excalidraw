import { HelperStrategy, HelperCtx, TextNode } from 'remark-excalidraw';
import isUrl from 'is-url';
import { RuntimeFactory } from 'src/http/RuntimeFactory';

import { BaseHelper } from './BaseHelper';
import { ResponseHandler } from './ResponseHandler';

export class LineHelper extends BaseHelper implements HelperStrategy {
    override async helperProcess(ctx: HelperCtx, node: TextNode): Promise<void> {
        const { value } = node;

        if (!value) return;

        let link;
        if (isUrl(value)) {
            link = value.trim();
        } else {
            link = this.extractLink(value);
        }

        if (link) {
            const provider = this.getProviders(link, ctx.providers);

            if (!provider) return;

            const oembedInfo = new URL(provider.url);
            const params = new URLSearchParams({
                url: link,
                format: 'json',
                ...provider.query,
            }).toString();

            oembedInfo.search = params;
            const embedLink = oembedInfo.href;
            const response = await RuntimeFactory.getHttpStrategy().request(embedLink);

            if (!response.ok || response.status !== 200) return;

            const type = ctx.type || 'html';

            node.data = {
                extra: {
                    type,
                },
            };

            await ResponseHandler.handleResponse(response, node, link);
        }
    }
}
