import { ContentStrategy } from 'remark-excalidraw';

import { BaseContentStrategy } from './BaseContentStrategy';

export class VideoStrategy extends BaseContentStrategy implements ContentStrategy {
    override handleContent(data: any): string {
        if (!this.node) {
            this.logInfo('No node found');
            throw new Error('No node found');
        }

        return data;
    }
}
