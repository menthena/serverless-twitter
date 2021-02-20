import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTweet } from '../../data-layer/deleteTweet'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tweetId = event.pathParameters.tweetId
    const userId = getUserId(event)
    try {
      await deleteTweet(userId, tweetId)
      logger.info('success delete tweet', userId, tweetId)

      return {
        statusCode: 201,
        body: JSON.stringify({})
      }
    } catch (e) {
      logger.error('delete tweet', tweetId, e)
    }
  }
)

handler.use(cors())
