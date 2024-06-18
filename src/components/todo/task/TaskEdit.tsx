import { Button, Modal } from "react-daisyui";
import TaskForm from "./TaskForm";
import { useCallback, useRef } from "react";
import { useApiSend } from "../../../api";
import { updateTask } from "../../../api/urls/task";
import { Task, Todo } from "../../../model";

type TaskEditProps = {
  todo: Todo;
  task: Task;
};
export default function TaskEdit({ todo, task }: TaskEditProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleHide = useCallback(() => {
    ref.current?.close();
  }, [ref]);
  const updateTaskMutation = useApiSend(
    updateTask,
    (data: any) => {
      return data;
    },
    (e: any) => {
      console.log(e);
    },
    [["tasks_" + todo.id]]
  );

  const doEditTask = (data: any) => {
    updateTaskMutation.mutate({ ...data, id: task.id, todoId: todo.id });
  };

  return (
    <div>
      <Button onClick={handleShow}>Edit</Button>
      <Modal ref={ref}>
        <form method='dialog'>
          <Button
            size='sm'
            color='ghost'
            shape='circle'
            className='absolute right-2 top-2'
          >
            x
          </Button>
        </form>
        <Modal.Header className='font-bold p-5'>
          Edit task #{todo.id}
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            handleSubmitTask={doEditTask}
            close={handleHide}
            task={task}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
