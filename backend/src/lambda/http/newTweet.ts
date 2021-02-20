import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { NewTweetRequest } from '../../requests/NewTweetRequest'

import { getUserId, getUserInfo } from '../utils'
import { newTweet } from '../../data-layer/newTweet'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tweetRequest: NewTweetRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const userInfo = getUserInfo(event)
    try {
      const tweet = await newTweet(userId, userInfo, tweetRequest)
      logger.error('success NewTweet', tweet)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: tweet
        })
      }
    } catch (e) {
      logger.error('error NewTweet', e)
    }
  }
)

handler.use(cors())
