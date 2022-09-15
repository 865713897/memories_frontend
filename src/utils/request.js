import axios from 'axios';

const baseAPI = process.env.NODE_ENV === 'development' ? 'api/v1' : '';
axios.defaults.baseURL = baseAPI;
axios.defaults.timeout = 5 * 60 * 1000;

/**
 * @description  请求全局拦截
 * @param  {boolean} transFormData  post方法 true转form提交表单方式
 * */
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * @description get请求
 * @url { url } 请求地址
 * @params { params } 请求参数
 */
export const get = (url, params) => axios.get(url, { params });

/**
 * @description post请求
 * @url { url } 请求地址
 * @params { params } 请求参数
 */
export const post = (url, params) => axios.post(url, params);
