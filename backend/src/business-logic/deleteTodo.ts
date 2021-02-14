import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const deleteTodo = async (userId: string, todoId: string) => {
  await docClient
    .delete({
      TableName: process.env.TODOS_TABLE,
      Key: {
        userId,
        todoId
      }
    })
    .promise()
}
