import { createDynamoDBClient } from '../lambda/utils'
import { UpdateTweetRequest } from '../requests/UpdateTweetRequest'

const docClient = createDynamoDBClient()

export const updateTweet = async (
  userId: string,
  tweetId: string,
  tweet: UpdateTweetRequest
) => {
  const Item = {
    tweetId,
    userId,
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
