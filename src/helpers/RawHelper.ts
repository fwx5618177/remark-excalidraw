import { HelperStrategy, HelperCtx, TextNode } from 'remark-excalidraw';

import { BaseHelper } from './BaseHelper';

export class RawHelper extends BaseHelper implements HelperStrategy {
    override async helperProcess(ctx: HelperCtx, node: TextNode): Promise<void> {
        console.log('not implemented yet', ctx, node);
    }
}
