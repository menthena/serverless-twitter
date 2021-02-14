import { createDynamoDBClient } from '../lambda/utils'

const docClient = createDynamoDBClient()

export const updateAttachmentUrl = async (
  userId: string,
  todoId: string,
  attachmentUrl: string
) => {
  await docClient
    .update({
      TableName: process.env.TODOS_TABLE,
      Key: {
        userId,
        todoId
      },
      UpdateExpression: 'SET attachmentUrl = :newValue',
      ExpressionAttributeValues: {
        ':newValue': attachmentUrl
      }
    })
    .promise()
}
