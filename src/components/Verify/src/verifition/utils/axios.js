import axios from 'axios';

// axios.defaults.baseURL = 'https://captcha.anji-plus.com/captcha-api';
axios.defaults.baseURL = 'http://116.63.206.95:8093';
// axios.defaults.baseURL = 'http://192.168.1.160:8093';

const service = axios.create({
  timeout: 40000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  },
})
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res
  },
  error => {
  }
)
export default service
