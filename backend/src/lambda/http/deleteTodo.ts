import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../business-logic/deleteTodo'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)

    await deleteTodo(userId, todoId)

    return {
      statusCode: 201,
      body: JSON.stringify({})
    }
  }
)

handler.use(cors())
