import { ContentStrategy, TextNode } from 'remark-excalidraw';

export abstract class BaseContentStrategy implements ContentStrategy {
    public node?: TextNode;

    abstract handleContent(data: any): string;

    protected logError(error: Error): void {
        console.error('Error handling content:', error.message);
    }

    protected logInfo(info: string): void {
        console.info('Info:', info);
    }

    public process(node: TextNode, data: any) {
        this.node = node;
        try {
            this.handleContent(data);
        } catch (error) {
            if (error instanceof Error) {
                this.logError(error);
            }
        }
    }
}
