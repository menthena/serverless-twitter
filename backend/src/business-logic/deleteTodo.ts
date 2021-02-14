import { docClient } from '../lambda/utils'

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
