import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()

export const createTodo = async (userId: string, todo: CreateTodoRequest) => {
  const Item = {
    userId,
    todoId: uuid.v4(),
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
