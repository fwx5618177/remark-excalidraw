import { ContentStrategy } from 'remark-excalidraw';

export abstract class BaseContentStrategy implements ContentStrategy {
    abstract handleContent(data: any): string;

    protected logError(error: Error): void {
        console.error('Error handling content:', error.message);
    }

    protected logInfo(info: string): void {
        console.info('Info:', info);
    }

    public process(data: any) {
        try {
            this.handleContent(data);
        } catch (error) {
            if (error instanceof Error) {
                this.logError(error);
            }
        }
    }
}
