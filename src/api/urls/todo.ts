import axios from "axios";
import { Todo } from "../../model";
import { request } from "../../utils/Network";
import { BASE_URL } from "../../utils/constants";

//The get all todos url definition
export const getTodos = (): Promise<Todo[]> =>
  request({
    url: `/todo`,
    method: "GET",
  });

export const getTodo = (id: number): Promise<Todo> =>
  request({
    url: `/todo/${id}`,
    method: "GET",
  });

export const createTodo = (todo: Todo): Promise<Todo> =>
  request({
    url: `/todo`,
    method: "POST",
    todo,
  });

export const updateTodo = (todo: Todo): Promise<Todo> => {
  return axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
};
export const removeTodo = (id: number): void => {
  request({
    url: `/todo/${id}`,
    method: "DELETE",
  });
};
