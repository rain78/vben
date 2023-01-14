import axios from 'axios';
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// axios.defaults.baseURL = 'https://captcha.anji-plus.com/captcha-api';
// axios.defaults.baseURL = 'http://116.63.206.95:8093';
const settings = require("@/settings.js");
const VUE_APP_BASE_API=settings.VUE_APP_BASE_API
axios.defaults.baseURL = VUE_APP_BASE_API;

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
