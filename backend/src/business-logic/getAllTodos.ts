import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const getAllTodos = async () => {
  const todos = await docClient
    .scan({
      TableName: process.env.TODOS_TABLE
    })
    .promise()
  return todos.Items
}
