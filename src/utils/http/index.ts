import Request from './core/Request';
import { assign } from 'lodash-es';
import { HttpSuccess } from '@/types/http';
import { Toast } from '@/utils/uniapi/prompt';
import { getEnvValue } from '@/utils/env';
import { useAuthStore } from '@/state/modules/auth';
import { ResultEnum } from '@/enums/httpEnum';

const BASE_URL = getEnvValue<string>('VITE_BASE_URL');
const HEADER = {
  'Content-Type': 'application/json;charset=UTF-8;',
  Accept: 'application/json, text/plain, */*',
};

function createRequest() {
  return new Request({
    baseURL: BASE_URL,
    header: HEADER,
    custom: {
      auth: true,
    },
  });
}

const request = createRequest();
/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (options) => {
    const { config } = options;
    if (config.custom?.auth) {
      const authStore = useAuthStore();
      if (!authStore.isLogin) {
        Toast('请先登录');
        // token不存在跳转到登录页
        return Promise.reject(options);
      }
      config.header = assign(config.header, {
        authorization: `Bearer ${authStore.getToken}`,
      });
    }
    return options;
  },
  (options) => {
    return Promise.reject(options);
  },
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  async (response: HttpSuccess<API>) => {
    const { data: resData } = response;
    const { code, message } = resData;
    if (code === ResultEnum.SUCCESS) {
      return resData as any;
    }
    Toast(message);
    return Promise.reject(resData);
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    // error('Request Error!');
    return Promise.reject(response);
  },
);

export { request };
