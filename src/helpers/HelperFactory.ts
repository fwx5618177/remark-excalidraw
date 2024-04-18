import { HelperCtx, HelperStrategy, Mode, TextNode } from 'remark-excalidraw';

import { RawHelper } from './RawHelper';
import { LineHelper } from './LineHelper';

export class HelperFactory {
    private static instance: HelperFactory;
    private helpers?: Record<Mode, HelperStrategy>;
    private mode?: Mode;

    private constructor() {
        this.helpers = {
            raw: new RawHelper(),
            line: new LineHelper(),
        };
    }

    public static getInstance(): HelperFactory {
        if (!HelperFactory.instance) {
            HelperFactory.instance = new HelperFactory();
        }

        return HelperFactory.instance;
    }

    public async process(ctx: HelperCtx, node: TextNode) {
        if (!this.helpers) throw new Error('not found helpers');

        this.mode = ctx?.mode || 'line';
        const helper = this.helpers[this.mode];

        if (!helper) throw new Error('not found helper');

        await helper.helperProcess(ctx, node);
    }
}
