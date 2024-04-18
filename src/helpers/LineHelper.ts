import { HelperStrategy, HelperCtx, TextNode } from 'remark-excalidraw';

import { BaseHelper } from './BaseHelper';

export class LineHelper extends BaseHelper implements HelperStrategy {
    override helperProcess(ctx: HelperCtx, node: TextNode): void {
        console.log(ctx, node);
    }
}
