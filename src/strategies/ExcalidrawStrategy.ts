import { ContentStrategy } from 'remark-excalidraw';

import { BaseContentStrategy } from './BaseContentStrategy';

export class ExcalidrawStrategy extends BaseContentStrategy implements ContentStrategy {
    override handleContent(data: any): string {
        if (!this.node) {
            this.logInfo('No node found');
            throw new Error('No node found');
        }

        this.node.data = {
            extra: {
                type: this.node.data?.extra?.type || 'html',
                sorts: 'excalidraw',
                value: data.toString(),
            },
        };

        return data;
    }
}
