import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../business-logic/getAllTodos'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(
  async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todos = await getAllTodos()

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  }
)

handler.use(cors())
