import * as uuid from 'uuid'
import { createDynamoDBClient } from '../lambda/utils'
import { NewTweetRequest } from '../requests/newTweetRequest'
import dateformat from 'dateformat'
import { createLogger } from '../utils/logger'

const logger = createLogger('lambda')
const docClient = createDynamoDBClient()

export const newTweet = async (
  userId: string,
  userInfo: { name: string; picture: string },
  tweet: NewTweetRequest
) => {
  logger.info(`userInfo ${userInfo.name}`)
  const Item = {
    userId,
    tweetId: uuid.v4(),
    name: userInfo.name,
    picture: userInfo.picture,
    createdAt: dateformat(new Date(), 'dd.mm.yyyy'),
    ...tweet
  }

  await docClient
    .put({
      TableName: process.env.TWEET_TABLE,
      Item
    })
    .promise()
  return Item
}
