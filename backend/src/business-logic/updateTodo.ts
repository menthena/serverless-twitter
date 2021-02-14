import * as AWS from 'aws-sdk'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()

export const updateTodo = async (
  userId: string,
  todoId: string,
  todo: UpdateTodoRequest
) => {
  const Item = {
    todoId,
    userId,
    ...todo
  }

  await docClient
    .put({
      TableName: process.env.TODOS_TABLE,
      Item
    })
    .promise()

  return Item
}
