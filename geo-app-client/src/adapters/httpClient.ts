import Axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type CreateAxiosDefaults } from 'axios';
import dictionary from '@/dictionary.json'
class HTTPClient {
    private instance: AxiosInstance;
    constructor(options: CreateAxiosDefaults) {
        this.instance = Axios.create(options)

        this.instance.interceptors.request.use((requestConfig) => {
            const lsToken = localStorage.getItem(dictionary.localStorageTokenKey);
            if (lsToken) {
                requestConfig.headers.set('Token', lsToken)
            }
            return requestConfig;
        })
    }

    public async request<P, R>(
        config: AxiosRequestConfig<P>
    ): Promise<R> {
        return this.instance.request<R, AxiosResponse<R>, P>(config)
            .then(r => r.data)
            .catch(e => Promise.reject(e.response?.data || e));
    }
}

export const httpClient = new HTTPClient({ baseURL: import.meta.env.VITE_APP_API_BASE_URL });