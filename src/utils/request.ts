import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  Axios,
} from "axios";
import { ResponseCode } from "@/mock/types/responseCode";
import { redirectLogin } from "./redirectLogin";
import { GetToken } from "./auth";

interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatcher?: (err: any) => any;
  responseInterceptor?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorCatcher?: (err: any) => any;
}

interface AxiosRequestConfigWithInterceptors extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

interface InstanceConifg {
  baseURL?: string;
  interceptors?: RequestInterceptors;
}

interface ReturnDataType {
  id: string;
  title: string;
  completed: boolean;
}

interface RequestDataType {
  id: string;
}

interface RequestCancelFunction {
  [key: string]: () => void;
}

interface CommonResponse {
  code: number;
  message: string;
}

interface TodoResponse extends CommonResponse {
  data: {
    [key: string]: ReturnDataType;
  };
}

/**
 * 可以对不同的请求/响应定制不同的请求/响应拦截器
 * 拦截器执行顺序：
 *  接口请求拦截器（如果有）-> 实例请求拦截器 -> 全局请求拦截器（类拦截器 -> 实例响应拦截器 -> 全局响应拦截器 -> 接口响应拦截器（如果有）
 * 可以取消请求：
 *  - 取消一个、
 *  - 取消多个、
 *  - 取消所有
 *
 * **/
export class Request {
  instance: AxiosInstance;
  instanceInterceptors?: RequestInterceptors;
  requestList: string[] = [];
  requestCancelPool: RequestCancelFunction[] = [];

  constructor(config: AxiosRequestConfigWithInterceptors) {
    this.instance = axios.create(config);
    this.instanceInterceptors = config.interceptors;
    const { interceptors } = this.instance;
    // 类请求拦截器（通用）
    interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = GetToken();
        if (config.headers && token) {
          config.headers["token"] = token;
        }
        return config;
      },
      (err) => console.log("err(class request intercepter): ", err)
    );
    // 实例请求拦截器
    interceptors.request.use(
      this.instanceInterceptors?.requestInterceptor,
      this.instanceInterceptors?.requestInterceptorCatcher
    );
    // 类响应拦截器 (通用)
    interceptors.response.use(
      (res: AxiosResponse<TodoResponse>) => {
        const { code, message } = res.data;
        if (code === ResponseCode.SUCCESS) {
          return res.data;
        } else if (code === ResponseCode.UNAUTHORIZED) {
          redirectLogin();
        } else {
          return Promise.reject(res.data);
        }
      },
      (err) => {
        console.log("err(class response intercepter): ", err);
      }
    );
    // 实例响应拦截器
    interceptors.response.use(
      this.instanceInterceptors?.responseInterceptor,
      this.instanceInterceptors?.responseInterceptorCatcher
    );
  }

  // request<T, R>(config: AxiosRequestConfig<R>): Promise<T> {
  request<T, R>(config: AxiosRequestConfigWithInterceptors): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果存在接口请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      const url = config.url;
      if (url) {
        this.requestList.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.requestCancelPool.push({
            [url]: c,
          });
        });
      }
      this.instance
        .request<any, T, R>(config)
        .then((res) => {
          // 如果存在接口响应拦截器
          console.log(res);
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor<T>(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          config.url && this.delRequest(config.url);
        });
    });
  }

  /**
   * 删除请求
   * 请求完成后/取消请求后 =》 删除请求。(finally执行，无论请求成功与否)
   */
  delRequest(url: string) {
    // 删除requestList中的url（如果存在）
    const index = this.requestList.findIndex(
      (requestUrl) => requestUrl === url
    );
    index !== -1 && this.requestList.splice(index, 1);
    // 删除requestCancelPool中的url（如果存在）
    const cancelIndex = this.requestCancelPool.findIndex(
      (cancel) => cancel[url]
    );
    cancelIndex !== -1 && this.requestCancelPool.splice(cancelIndex, 1);
  }

  /**
   * 取消所有请求
   */
  cancelAllRequest() {
    this.requestCancelPool.forEach((cancelFunction) => {
      Object.keys(cancelFunction).forEach((key) => cancelFunction[key]());
    });
  }

  /**
   * 取消指定请求
   */
  cancelRequest(url: string | string[]) {
    if (Array.isArray(url)) {
      url.forEach((requestNeedCancel) => {
        const item = this.requestCancelPool.find(
          (remainRequest) => remainRequest[requestNeedCancel]
        );
        item && item[requestNeedCancel]();
      });
    } else {
      const item = this.requestCancelPool.find(
        (remainRequest) => remainRequest[url]
      );
      item && item[url]();
    }
  }
}

export const serve = new Request({
  baseURL: "http://localhost:5173/api/",
  // interceptors: {
  //   requestInterceptor: (config: AxiosRequestConfig): AxiosRequestConfig => {
  //     console.log('实例的request interceptor执行了')
  //     return config
  //   },
  //   // requestInterceptorCatcher:(err)=>{
  //   //   console.log(err)
  //   // },
  //   responseInterceptor: <AxiosResponse>(res: AxiosResponse): AxiosResponse => {
  //     console.log('实例的response interceptor执行了',res)
  //     return res
  //   },
  //   // responseInterceptorCatcher:(err)=>{
  //   //   console.log("实例的response interceptor捕获了错误")
  //   //   return Promise.reject(err)
  //   // }
  // }
});

export const request = serve.request.bind(serve);

// -- use Demo start

// serve.request<ReturnDataType, RequestDataType>({
//   url: 'todo',
//   method: 'post',
//   data: {
//     id: '1'
//   },
//   interceptors: {
//     requestInterceptor: (config: AxiosRequestConfig): AxiosRequestConfig => {
//       console.log('接口的request interceptor执行了')
//       return config
//     },
//     responseInterceptor: <ReturnDataType>(res: ReturnDataType): ReturnDataType => {
//       console.log('接口的response interceptor执行了')
//       return res
//     }
//   }
// }).then(res => {
//   console.log('res: ', res)
// }).catch(err => {
//   console.log('err: ', err)
// })

// console.log('取消请求')
// serve.cancelRequest('todo')

// -- use Demo end
