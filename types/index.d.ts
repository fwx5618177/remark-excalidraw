declare module 'remark-excalidraw' {
    import { Node } from 'unist';

    type Mode = 'raw' | 'line';

    type Options = {
        mode?: Mode;
    };

    type ExtraSort = 'card' | 'image' | 'link' | 'video' | 'iframe' | 'title';
    type ExtraType = 'jsx' | 'html';

    interface TextNode extends Node {
        type: 'text';
        value: string;
        extra?: {
            type: ExtraType;
            sorts: Sort;
            value: string;
        };
    }

    type HttpOptions = {
        method: 'post' | 'get';
        headers: Record<string, string>;
        body?: any;
    };

    interface HttpStrategy {
        request<T>(url: string, options?: HttpOptions): Promise<T>;
    }

    interface ContentStrategy {
        handleContent(content: string): string;
    }

    type HelperCtx = {
        providers: Providers;
    } & Options;

    interface HelperStrategy {
        helperProcess(ctx: HelperCtx, node: TextNode): void;
    }

    type endPoints = {
        schemes: string[];
        url: string;
    };

    interface ProviderProps {
        provider_name: string;
        provider_url: string;
        endpoints: endPoints[];
    }

    type Providers = ProviderProps[];
}
