import axios from "axios";
import router from "@/router";
import { BASE_URL } from "@/router/base-url";
import { errorMsg } from "@/utils/msg";
import { stringify } from "@/utils/helper";
// 创建axios实例
const request = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
});
// axios实例默认配置
request.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
request.defaults.transformRequest = data => {
  return stringify(data);
};
// 返回状态拦截，进行状态的集中判断
request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.success) {
      return Promise.resolve(res);
    } else {
      // 内部错误码处理
      if (res.code === 1401) {
        errorMsg(res.message || "登录已过期，请重新登录！");
        router.replace({ path: `${BASE_URL}/login` });
      } else {
        // 默认的错误提示
        errorMsg(res.message || "网络异常，请稍后重试！");
      }
      return Promise.reject(res);
    }
  },
  error => {
    if (/timeout\sof\s\d+ms\sexceeded/.test(error.message)) {
      // 超时
      errorMsg("网络出了点问题，请稍后重试！");
    }
    if (error.response) {
      // http状态码判断
      switch (error.response.status) {
        // http status handler
        case 404:
          errorMsg("请求的资源不存在！");
          break;
        case 500:
          errorMsg("内部错误，请稍后重试！");
          break;
        case 503:
          errorMsg("服务器正在维护，请稍等！");
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

// 处理get请求
const get = (url, params, config = {}) => request.get(url, { ...config, params });
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
const deletes = (url, params, config = {}) =>
  request.delete(url, { ...config, params });
// 处理post请求
const post = (url, params, config = {}) => request.post(url, params, config);
// 处理put请求
const put = (url, params, config = {}) => request.put(url, params, config);
export default {
  get,
  deletes,
  post,
  put
};
