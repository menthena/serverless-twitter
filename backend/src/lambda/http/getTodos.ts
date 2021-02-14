import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../data-layer/getAllTodos'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    try {
      const todos = await getAllTodos(userId)
      logger.info('success getTodos', todos)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items: todos
        })
      }
    } catch (e) {
      logger.error('error getTodos', e)
    }
  }
)

handler.use(cors())
