import { Task } from "../../model";
import { request } from "../../utils/Network";

//The get all todos url definition
export const getTasks = (todoId: number): Promise<Task[]> =>
  request({
    url: `/todo/${todoId}/todo_item`,
    method: "GET",
  });

export const addTask = (data: any): Promise<Task[]> => {
  return request({
    url: `/todo/${data.todoId}/todo_item`,
    method: "POST",
    data,
  });
};

export const updateTask = (data: any): Promise<Task[]> => {
  return request({
    url: `/todo/${data.todoId}/todo_item/${data.id}`,
    method: "PUT",
    data,
  });
};
