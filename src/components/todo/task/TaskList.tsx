import { useApiGet } from "../../../api";
import { Task, Todo } from "../../../model";
import { getTasks } from "../../../api/urls/task";
import TaskEdit from "./TaskEdit";
import TaskSearch from "./TaskSearch";
import { useMutation } from "@tanstack/react-query";

export type TaskListProps = {
  todo: Todo;
};
export default function TaskList({ todo }: TaskListProps) {
  const find = () => {
    return Promise.resolve(tasks);
  };

  const searchMutation = useMutation({
    mutationFn: find,
    mutationKey: ["tasks_" + todo.id],
  });

  const tasksQuery = useApiGet(["tasks_" + todo.id], () => getTasks(todo.id));

  if (tasksQuery.isPending) return <>Loading...</>;

  if (tasksQuery.error) return <></>;

  const doFind = (data: any) => {
    searchMutation.mutate(data);
  };

  const tasks = tasksQuery.data as Task[];
  return (
    <div>
      <TaskSearch search={(data) => doFind(data)} />
      <div className='overflow-y-auto h-50'>
        <div className='flex flex-wrap'>
          {tasks.map((task) => {
            const deadline = new Date(task.deadline);
            return (
              <div className='' key={task.id}>
                <div className='card w-96 bg-base-100 shadow-xl m-2'>
                  <div className='m-5'>
                    Due Date: {deadline.getFullYear()}/{deadline.getMonth()}/
                    {deadline.getDay()}
                  </div>
                  <div className='card-body'>
                    <h2 className='card-title'>{task.title}</h2>
                    <p>{task.description}</p>
                    <div className='card-actions justify-end'>
                      <TaskEdit todo={todo} task={task} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
