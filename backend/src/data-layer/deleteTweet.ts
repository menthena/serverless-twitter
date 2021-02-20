import { createDynamoDBClient } from '../lambda/utils'

const docClient = createDynamoDBClient()

export const deleteTweet = async (userId: string, tweetId: string) => {
  await docClient
    .delete({
      TableName: process.env.TWEET_TABLE,
      Key: {
        userId,
        tweetId
      }
    })
    .promise()
}
