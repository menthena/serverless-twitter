import { createDynamoDBClient } from '../lambda/utils'
import dateformat from 'dateformat'

const docClient = createDynamoDBClient()

export const getDailyTweets = async () => {
  const today = new Date()
  const tweets = await docClient
    .query({
      TableName: process.env.TWEET_TABLE,
      IndexName: process.env.DAILY_INDEX_NAME,
      KeyConditionExpression: 'createdAt = :createdAt',
      ExpressionAttributeValues: {
        ':createdAt': dateformat(today, 'dd.mm.yyyy')
      }
    })
    .promise()
  return tweets.Items
}
