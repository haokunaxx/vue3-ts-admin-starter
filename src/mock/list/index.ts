import { MockMethod, Recordable } from 'vite-plugin-mock'
import { ResponseCode } from '../types/responseCode'
import { v4 as uuidv4 } from 'uuid'
import { Random } from 'mockjs'
import { MockResponseBase } from '../index'
const fetchList: MockMethod = {
  url: '/api/contract/list',
  method: 'get',
  response(): MockResponseBase {
    return {
      code: ResponseCode.SUCCESS,
      message: '获取列表成功',
      data: [...Array(124)].map((item) => ({
        id: uuidv4(),
        name: Random.ctitle(8, 10),
        status: Random.boolean(),
        code: Random.id(),
        type: Random.pick(['待履行', '审核失败', '待审核']),
        recipentPaymentType: Random.pick(['收款', '付款']),
        price: Random.integer(3e8, 10e8)
      }))
    }
  }
}

export default [fetchList]
