import { Node } from 'unist';
import { Response as NodeResponse } from 'node-fetch';

export type Mode = 'raw' | 'line';
export type ExtraType = 'jsx' | 'html';

export type Options = {
    mode?: Mode;
    type?: ExtraType;
};

export interface BaseSort {
    photo: string;
    video: string;
}

export interface ExtraSort extends BaseSort {
    card: string;
    excalidraw: string;
    anchor: string;
    iframe: string;
}

export interface TextNode extends Node {
    type: 'text' | 'html';
    value: string;
    data?: {
        extra?: {
            type?: ExtraType;
            sorts?: keyof ExtraSort;
            value?: string;
        };
    };
}

export type HttpOptions = {
    method: 'post' | 'get';
    headers: Record<string, string>;
    body?: any;
};

export interface HttpStrategy {
    requestProvider<T>(url: string, options?: HttpOptions): Promise<T>;
    request(url: string, options?: HttpOptions): Promise<Response | NodeResponse>;
}

export interface ContentStrategy {
    handleContent(data: string): string;
}

export type HelperCtx = {
    providers: Providers;
} & Options;

export interface HelperStrategy {
    helperProcess(ctx: HelperCtx, node: TextNode): Promise<void>;
}

export type EndPoints = {
    schemes: string[];
    url: string;
    params?: any; // TODO: remove it
};

export interface ProviderProps {
    provider_name: string;
    provider_url: string;
    endpoints: EndPoints[];
}

export type Providers = ProviderProps[];

export type ProviderURL = {
    name: string;
    url: string;
    query: Record<string, string>;
};

export interface CommonOembedInfo {
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

export interface OembedVideoInfo extends CommonOembedInfo {
    html: string;
}

export interface OembedImageInfo extends CommonOembedInfo {
    url: string;
}
