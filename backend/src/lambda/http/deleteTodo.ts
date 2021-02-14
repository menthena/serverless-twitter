import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../data-layer/deleteTodo'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    try {
      await deleteTodo(userId, todoId)
      logger.info('success delete todo', userId, todoId)

      return {
        statusCode: 201,
        body: JSON.stringify({})
      }
    } catch (e) {
      logger.error('delete todo', todoId, e)
    }
  }
)

handler.use(cors())
