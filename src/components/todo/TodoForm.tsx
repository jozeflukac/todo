import { useForm } from "react-hook-form";
import { Todo } from "../../model";
import { useCallback, useRef } from "react";
import { useApiSend } from "../../api";
import { Button, Modal } from "react-daisyui";
import { updateTodo } from "../../api/urls/todo";

type TodoFormProps = {
  todo: Todo;
};

export default function TodoForm({ todo }: TodoFormProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleHide = useCallback(() => {
    ref.current?.close();
  }, [ref]);
  const updateTodoMutation = useApiSend(
    updateTodo,
    (data: any) => {
      return data;
    },
    (e: any) => {
      console.log(e);
    },
    [["todosMenu"], ["todo_" + todo.id]]
  );

  const doEditTask = (data: any) => {
    updateTodoMutation.mutate({ ...data, id: todo.id });
    handleHide();
  };

  const { register, handleSubmit } = useForm<Todo>();
  const onSubmit = (task: Todo) => {
    doEditTask(task);
  };

  return (
    <>
      <Button onClick={handleShow}>Change</Button>
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
          Edit TODO #{todo.id}
        </Modal.Header>
        <Modal.Body>
          <div className='m-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex w-full component-preview p-4 items-center justify-center gap-2 font-sans'>
                <label className='input input-bordered flex items-center gap-2'>
                  Title:
                  <input
                    type='text'
                    className='grow'
                    placeholder='Add Title Here...'
                    {...register("title")}
                    defaultValue={todo.title}
                  />
                </label>
              </div>
              <div className='flex w-full component-preview p-4 items-center justify-center gap-2 font-sans'>
                <label className='input input-bordered flex items-center gap-2'>
                  Finished:
                  <input
                    type='checkbox'
                    className='grow'
                    placeholder='Deadline'
                    {...register("finished")}
                  />
                </label>
              </div>
              <div className='flex justify-between'>
                <button className='btn' onClick={handleHide}>
                  Close
                </button>
                <button className='btn btn-success' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
