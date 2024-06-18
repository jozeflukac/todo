import { Button, Modal } from "react-daisyui";
import TaskForm from "./TaskForm";
import { useCallback, useRef } from "react";
import { useApiSend } from "../../../api";
import { addTask } from "../../../api/urls/task";

export type TaskAddProps = {
  todoId: number;
};

export default function TaskAdd({ todoId }: TaskAddProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleHide = useCallback(() => {
    ref.current?.close();
  }, [ref]);
  const addTaskMutation = useApiSend(
    addTask,
    (data: any) => {
      return data;
    },
    (e: any) => {
      console.log(e);
    },
    [["tasks_" + todoId]]
  );

  const doAddTask = (data: any) => {
    addTaskMutation.mutate({ ...data, todoId: todoId });
  };
  return (
    <div className='mt-5 mb-3'>
      <Button onClick={handleShow}>Add Task</Button>
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
        <Modal.Header className='font-bold p-5'>Add new task!</Modal.Header>
        <Modal.Body>
          <TaskForm handleSubmitTask={doAddTask} close={handleHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
