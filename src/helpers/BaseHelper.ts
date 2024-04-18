import { HelperCtx, HelperStrategy, ProviderURL, Providers, TextNode } from 'remark-excalidraw';

export abstract class BaseHelper implements HelperStrategy {
    abstract helperProcess(ctx: HelperCtx, node: TextNode): Promise<void>;

    /**
     * 如果有 link，则提取 link
     * 如果没有 link，则返回 ''
     * @param value
     * @returns
     */
    public extractLink(value: string): string {
        const urlRegex = /https?:\/\/[^\s]+/g;
        const url = value.match(urlRegex);

        return url ? url[0] : '';
    }

    public getProviders(link: string, providers: Providers): ProviderURL | null {
        const { host, searchParams } = new URL(link);

        if (!host) {
            return null;
        }

        const provider = providers.find(provider => provider.provider_url.includes(host));
        const result = provider?.endpoints?.find(endpoint =>
            endpoint.schemes.some(scheme => new RegExp(scheme.replace('*', '.*')).test(link)),
        );

        if (!result) {
            return null;
        }

        return {
            name: provider!.provider_name,
            url: result.url,
            query: {
                url: link,
                ...result.params,
                ...searchParams,
            },
        };
    }
}
