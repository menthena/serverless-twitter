import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTweetRequest } from '../../requests/UpdateTweetRequest'
import { getUserId } from '../utils'
import { updateTweet } from '../../data-layer/updateTweet'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tweetId = event.pathParameters.tweetId
    const userId = getUserId(event)
    const updatedTweet: UpdateTweetRequest = JSON.parse(event.body)
    try {
      const tweet = await updateTweet(userId, tweetId, updatedTweet)
      logger.info('success update tweet', updatedTweet)

      return {
        statusCode: 200,
        body: JSON.stringify({
          item: tweet
        })
      }
    } catch (e) {
      logger.error('error update tweet', e)
    }
  }
)

handler.use(cors())
