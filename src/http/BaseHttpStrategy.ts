import { HttpOptions, HttpStrategy } from 'remark-excalidraw';
import { COMMON } from 'src/constants';
import { Response as NodeResponse } from 'node-fetch';

export abstract class BaseHttpStrategy implements HttpStrategy {
    abstract requestProvider<T>(url: string, options?: HttpOptions): Promise<T>;
    abstract request(url: string, options?: HttpOptions): Promise<Response | NodeResponse>;

    public getDefaultValue<T>(): T {
        return COMMON.DEFAULT_DRAW_PROVIDER as T;
    }
}
