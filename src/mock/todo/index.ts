import { v4 as uuidv4 } from 'uuid'
import { Random } from 'mockjs'
import { MockMethod, RespThisType, Recordable } from 'vite-plugin-mock'
import { IncomingMessage } from 'http'
interface Todo {
  id: string
  title: string
  complete: boolean
}

interface FetchResponse {
  code: number
}

interface FetchTodosResponse extends FetchResponse {
  data: Todo[]
}

interface FetchTodoByIdRequestBody {
  id: string
}

interface RequestWithBody extends IncomingMessage {
  body: {
    [key: string]: string
  }
}

export default [
  {
    url: '/api/todos',
    method: 'get',
    response: (): FetchTodosResponse => ({
      code: 200,
      data: Array(Random.natural(6, 10))
        .fill(null)
        .map(() => ({
          id: uuidv4(),
          title: Random.csentence(5, 12),
          complete: false
        }))
    })
  },
  {
    url: '/api/todo',
    method: 'post',
    response: function (
      this: RespThisType,
      opt: { url: Recordable; body: Recordable }
    ) {
      const { id } = opt.body
      return id !== undefined
        ? {
            code: 401,
            msg: 'success',
            data: {
              id: id,
              title: `这是id为${id}的todo的标题`,
              complete: false
            }
          }
        : {
            code: 200,
            msg: 'bad request',
            data: null
          }
    }
    // rawResponse: (req: RequestWithBody, res) => {
    //   console.log(req)
    //   return
    //   const { id } = req.body
    //   if (id !== undefined) {
    //     if (id === '1') {
    //       res.setHeader('Content-Type', 'text/plain')
    //       res.statusCode = 200
    //       res.end()
    //     } else {
    //       res.end({
    //         code: 404,
    //         msg: 'not found'
    //       })
    //     }
    //   } else {
    //     res.end({
    //       code: 400,
    //       msg: 'bad request'
    //     })
    //   }
    // }
  },
  {
    url: '/api/todos',
    method: 'post',
    response() {
      setTimeout(() => {
        return {
          title: 'success'
        }
      }, 10000)
    }
  }
] as MockMethod[]
