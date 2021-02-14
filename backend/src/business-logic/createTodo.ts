import * as uuid from 'uuid'
import { docClient } from '../lambda/utils'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

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
