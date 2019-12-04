declare module 'refresh-fetch' {
  export type Fetch = <T = any>(
    url: RequestInfo,
    config?: RequestInit
  ) => Promise<IResponse<T>>;

  export interface IResponse<T> {
    response: Response;
    body: T;
  }

  export interface IResponseError {
    name: 'ResponseError';
    status: number;
    response: Response;
    body: any;
  }

  export interface IConfiguration {
    fetch: Fetch;
    shouldRefreshToken: (error: IResponseError) => boolean;
    refreshToken: () => Promise<any>;
  }

  export function configureRefreshFetch(configuration: IConfiguration): Fetch;

  export function fetchJSON<T>(
    url: RequestInfo,
    config: RequestInit
  ): Promise<IResponse<T>>;
}
// declare var window: Window & typeof globalThis;
// interface Window {
//   require: any;
// }
