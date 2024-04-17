import { ContentStrategy } from 'remark-excalidraw';

import { BaseContentStrategy } from './BaseContentStrategy';

export class ExcalidrawStrategy extends BaseContentStrategy implements ContentStrategy {
    handleContent(data: any): string {
        return data;
    }
}
