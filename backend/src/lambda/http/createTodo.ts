import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import { getUserId } from '../utils'
import { createTodo } from '../../data-layer/createTodo'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    try {
      const todo = await createTodo(userId, newTodo)
      logger.error('success createTodo', todo)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: todo
        })
      }
    } catch (e) {
      logger.error('error createTodo', e)
    }
  }
)

handler.use(cors())
