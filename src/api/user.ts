import { request } from "@/utils/request"
interface CommonResponse<T> {
  code: number;
  message: string;
  data: T
}
interface LoginResponse {
  token: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export function Login(data: LoginRequestData) {
  return request<CommonResponse<LoginResponse>, LoginRequestData>({
    url: 'login',
    method: 'post',
    data
  })
}

export interface GetUserInfoRequest {
  token: string;
}

export interface GetUserInfoResponse {
  introduction: string;
  name: string;
  roles: string[];
}

// export function GetUserInfo(data: GetUserInfoRequest) {
export function GetUserInfo(token: string) {
  return request<CommonResponse<GetUserInfoResponse>, GetUserInfoRequest>({
    url: 'getUserInfo',
    method: 'post',
    data: {
      token
    }
  })
}


export function Logout() {
  return request<CommonResponse<void>, void>({
    url: 'logout',
    method: 'post'
  })
}