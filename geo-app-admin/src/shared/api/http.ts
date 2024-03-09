import Axios from 'axios';

export const http = Axios.create({ baseURL: import.meta.env.VITE_APP_API_BASE_URL })

http.interceptors.request.use((requestConfig) => {
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
        requestConfig.headers.set('Token', lsToken)
    }
    return requestConfig;
})
