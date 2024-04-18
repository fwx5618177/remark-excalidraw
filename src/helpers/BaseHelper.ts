import { HelperCtx, HelperStrategy, TextNode } from 'remark-excalidraw';

export abstract class BaseHelper implements HelperStrategy {
    abstract helperProcess(ctx: HelperCtx, node: TextNode): void;
}
