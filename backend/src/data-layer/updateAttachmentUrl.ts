import { createDynamoDBClient } from '../lambda/utils'

const docClient = createDynamoDBClient()

export const updateAttachmentUrl = async (
  userId: string,
  tweetId: string,
  attachmentUrl: string
) => {
  await docClient
    .update({
      TableName: process.env.TWEET_TABLE,
      Key: {
        userId,
        tweetId
      },
      UpdateExpression: 'SET attachmentUrl = :newValue',
      ExpressionAttributeValues: {
        ':newValue': attachmentUrl
      }
    })
    .promise()
}
