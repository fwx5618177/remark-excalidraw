import { HttpOptions, HttpStrategy } from 'remark-excalidraw';
import { COMMON } from 'src/constants';

export abstract class BaseHttpStrategy implements HttpStrategy {
    abstract request<T>(url: string, options?: HttpOptions): Promise<T>;

    public getDefaultValue<T>(): T {
        return [...COMMON.DEFAULT_DRAW_PROVIDER, ...COMMON.DEFAULT_VIDEO_PROVIDER] as T;
    }
}
