import axios from 'axios';
import { message } from 'antd';

const baseAPI = process.env.NODE_ENV === 'development' ? 'api/v1' : '';
axios.defaults.baseURL = baseAPI;
axios.defaults.timeout = 5 * 60 * 1000;

/**
 * @description  请求全局拦截
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
 * @description  响应全局拦截
 * */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { message: _message } = error || {};
    message.error(_message);
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
