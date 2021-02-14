import { createDynamoDBClient } from '../lambda/utils'

const docClient = createDynamoDBClient()

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
