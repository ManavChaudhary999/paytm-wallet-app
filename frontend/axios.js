import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://0ccd43f1-a295-4938-9a9a-b4ff2cb56d21-00-3l79i8qyi75ef.pike.replit.dev/api/v1',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;