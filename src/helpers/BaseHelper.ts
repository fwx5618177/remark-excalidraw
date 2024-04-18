import { HelperCtx, HelperStrategy, TextNode } from 'remark-excalidraw';

export abstract class BaseHelper implements HelperStrategy {
    abstract helperProcess(ctx: HelperCtx, node: TextNode): void;

    /**
     * 如果有 link，则提取 link
     * 如果没有 link，则返回原始值
     * @param value
     * @returns
     */
    public extractLink(value: string): string {
        const urlRegex = /https?:\/\/[^\s]+/g;
        const url = value.match(urlRegex);

        return url ? url[0] : value;
    }
}
