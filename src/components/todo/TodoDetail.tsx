import { useParams } from "react-router-dom";
import { useApiGet } from "../../api";
import TodoInfo from "./TodoInfo";
import TaskList from "./task/TaskList";
import { getTodo } from "../../api/urls/todo";
import { Todo } from "../../model";
import TaskAdd from "./task/TaskAdd";
import TodoForm from "./TodoForm";

export default function TodoDetail() {
  const { todoId } = useParams();

  const todoQuery = useApiGet(["todo_" + todoId], () =>
    getTodo(Number(todoId))
  );

  if (todoQuery.isPending) return <>Loading...</>;

  if (todoQuery.error)
    return <>An error has occurred: ${todoQuery.error.message}</>;

  const todo = todoQuery.data as Todo;

  return (
    <div className='p-5'>
      <span className='m-2'>
        <TodoInfo todo={todo} />
      </span>
      <TodoForm todo={todo} />
      <TaskList todo={todo} />
      <TaskAdd todoId={todo.id} />
    </div>
  );
}
