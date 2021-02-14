import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const getAllTodos = async (userId: string) => {
  const todos = await docClient
    .query({
      TableName: process.env.TODOS_TABLE,
      IndexName: process.env.INDEX_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    .promise()
  return todos.Items
}
