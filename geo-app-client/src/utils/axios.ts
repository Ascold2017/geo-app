import Axios from 'axios';

// @ts-expect-error sdsd
const axiosInstance = Axios.create({ baseURL: import.meta.env.VITE_APP_API_BASE_URL })

axiosInstance.interceptors.request.use((requestConfig) => {
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
        requestConfig.headers.set('Token', lsToken)
    }
    return requestConfig;
})

export default axiosInstance;