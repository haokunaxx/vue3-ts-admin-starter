import { request } from '@/utils/request'
import { CommonResponse } from './api.index'
import { ListItem } from '@/mock/list/list'

export function fetchList(): Promise<CommonResponse<ListItem[]>> {
  return request<CommonResponse<ListItem[]>, void>({
    url: 'contract/list',
    method: 'get'
  })
}
