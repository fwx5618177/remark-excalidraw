import {
    ContentStrategy,
    ExtraSort,
    OembedImageInfo,
    OembedVideoInfo,
    TextNode,
} from 'remark-excalidraw';
import { CardStrategy } from 'src/strategies/CardStrategy';
import { ExcalidrawStrategy } from 'src/strategies/ExcalidrawStrategy';
import { Response as NodeResponse } from 'node-fetch';
import { StrategyFactory } from 'src/strategies/StrategyFactory';
import { VideoStrategy } from 'src/strategies/VideoStrategy';
import { ImageStrategy } from 'src/strategies/ImageStrategy';

export class ResponseHandler {
    private static instance: ResponseHandler;
    private strategy?: Record<keyof ExtraSort, ContentStrategy>;

    private constructor() {
        this.strategy = {
            'video': new VideoStrategy(),
            'photo': new ImageStrategy(),
            'card': new CardStrategy(),
            'excalidraw': new ExcalidrawStrategy(),
            'anchor': new ExcalidrawStrategy(),
            'iframe': new ExcalidrawStrategy(),
        };
    }

    public static getInstance(): ResponseHandler {
        if (!ResponseHandler.instance) {
            ResponseHandler.instance = new ResponseHandler();
        }

        return ResponseHandler.instance;
    }

    public selectStrategy(sort: keyof ExtraSort): ContentStrategy {
        if (!this.strategy) throw new Error('not found strategy');

        return this.strategy[sort] || this.strategy['iframe'];
    }

    public static async handleResponse(
        response: Response | NodeResponse,
        node: TextNode,
        link: string,
    ) {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const isHtml = response.headers.get('content-type')?.includes('text/html');

        let data: Partial<OembedVideoInfo | OembedImageInfo>;
        let mode: keyof ExtraSort;

        if (isJson) {
            data = await response.json();
            mode = data.type as keyof ExtraSort;
        } else if (isHtml) {
            if (link.includes('excalidraw')) {
                mode = 'excalidraw';
                data = {
                    url: link,
                    type: 'excalidraw',
                    title: 'excalidraw',
                    width: 756,
                    height: 495,
                };
            } else {
                mode = 'iframe';
                data = {
                    url: link,
                    type: 'iframe',
                    title: 'iframe',
                    width: 756,
                    height: 495,
                };
            }
        } else {
            mode = 'card';
            data = {
                url: link,
                type: 'card',
                title: 'card',
                width: 756,
                height: 495,
            };
        }

        const factory = StrategyFactory.getInstance();
        const instance = ResponseHandler.getInstance();
        factory.strategyInstance = instance.selectStrategy(mode);

        factory.process(node, data);
    }
}
