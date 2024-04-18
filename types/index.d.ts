declare module 'remark-excalidraw' {
    import { Node } from 'unist';
    import { Response as NodeResponse } from 'node-fetch';

    type Mode = 'raw' | 'line';
    type ExtraType = 'jsx' | 'html';

    type Options = {
        mode?: Mode;
        type?: ExtraType;
    };

    interface BaseSort {
        photo: string;
        video: string;
    }

    interface ExtraSort extends BaseSort {
        card: string;
        excalidraw: string;
        anchor: string;
        iframe: string;
    }

    interface TextNode extends Node {
        type: 'text';
        value: string;
        data?: {
            extra?: {
                type?: ExtraType;
                sorts?: keyof ExtraSort;
                value?: string;
            };
        };
    }

    type HttpOptions = {
        method: 'post' | 'get';
        headers: Record<string, string>;
        body?: any;
    };

    interface HttpStrategy {
        requestProvider<T>(url: string, options?: HttpOptions): Promise<T>;
        request(url: string, options?: HttpOptions): Promise<Response | NodeResponse>;
    }

    interface ContentStrategy {
        handleContent(data: string): string;
    }

    type HelperCtx = {
        providers: Providers;
    } & Options;

    interface HelperStrategy {
        helperProcess(ctx: HelperCtx, node: TextNode): Promise<void>;
    }

    type EndPoints = {
        schemes: string[];
        url: string;
        params?: any; // TODO: remove it
    };

    interface ProviderProps {
        provider_name: string;
        provider_url: string;
        endpoints: EndPoints[];
    }

    type Providers = ProviderProps[];

    type ProviderURL = {
        name: string;
        url: string;
        query: Record<string, string>;
    };

    interface CommonOembedInfo {
        version: string;
        type: string;
        title: string;
        author_name: string;
        author_url: string;
        provider_name: string;
        provider_url: string;
        thumbnail_url: string;
        thumbnail_width: number;
        thumbnail_height: number;
        width: number;
        height: number;
    }

    interface OembedVideoInfo extends CommonOembedInfo {
        html: string;
    }

    interface OembedImageInfo extends CommonOembedInfo {
        url: string;
    }
}
