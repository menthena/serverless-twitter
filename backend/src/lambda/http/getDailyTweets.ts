import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getDailyTweets } from '../../data-layer/getDailyTweets'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda')

export const handler = middy(
  async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const tweets = await getDailyTweets()
      logger.info('success getDailyTweets', tweets)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items: tweets
        })
      }
    } catch (e) {
      logger.error('error getDailyTweets', e)
    }
  }
)

handler.use(cors())
