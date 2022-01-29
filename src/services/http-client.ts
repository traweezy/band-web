import axios, { AxiosInstance, AxiosResponse } from 'axios';

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this.handleError,
    );
  };

  private _handleResponse = <T>(res: AxiosResponse<T>) => res;

  protected handleError = (error: unknown): Promise<never> =>
    Promise.reject(error);
}

export default HttpClient;
