import { HelperStrategy, HelperCtx, TextNode } from 'remark-excalidraw';

import { BaseHelper } from './BaseHelper';

export class LineHelper extends BaseHelper implements HelperStrategy {
    override helperProcess(ctx: HelperCtx, node: TextNode): void {
        const { value } = node;

        if (!value) return;

        /**
         * TODO:
         * 1. 如果只有 link，则处理 link
         * 2. 如果包含 link 和 text，则提取 link
         * 3. 根据不同的link，选择和处理不同的行为
         */

        console.log(ctx, node);
    }
}
