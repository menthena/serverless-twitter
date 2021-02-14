import { docClient } from '../lambda/utils'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

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
