import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { updateTodo } from '../../data-layer/updateTodo'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    try {
      const todo = await updateTodo(userId, todoId, updatedTodo)
      logger.info('success update todo', updatedTodo)

      return {
        statusCode: 200,
        body: JSON.stringify({
          item: todo
        })
      }
    } catch (e) {
      logger.error('error update todo', e)
    }
  }
)

handler.use(cors())
