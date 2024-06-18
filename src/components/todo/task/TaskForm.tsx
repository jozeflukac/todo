import { useForm } from "react-hook-form";
import { Task } from "../../../model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    deadline: yup.date().required(),
  })
  .required();

type FormData = {
  title: string;
  description: string;
  deadline: Date;
};

type TaskFormProps = {
  task?: Task;
  handleSubmitTask: (task: Task) => void;
  close: () => void;
};

export default function TaskForm({
  handleSubmitTask,
  close,
  task,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data: any) => {
    handleSubmitTask(data);
    close();
  });

  return (
    <div className='p-5 m-2'>
      <form onSubmit={onSubmit}>
        <div className='flex w-full component-preview p-2 items-center justify-center gap-2 font-sans'>
          <label className='input input-bordered flex items-center gap-2'>
            Title:
            <input
              type='text'
              className='grow'
              placeholder='Add Title Here...'
              {...register("title")}
              defaultValue={task?.title}
            />
          </label>
        </div>

        <p>{errors.title?.message}</p>

        <div className='flex w-full component-preview pt-2 pb-4 items-center justify-center gap-2 font-sans'>
          <div className='form-control'>
            <label className='label'>Description:</label>
            <textarea
              placeholder='Add Description Here...'
              className='textarea textarea-bordered'
              {...register("description")}
              defaultValue={task?.description}
            />
          </div>
        </div>

        <p>{errors.description?.message}</p>
        <div className='flex w-full component-preview p-4 items-center justify-center gap-2 font-sans'>
          <label className='input input-bordered flex items-center gap-2'>
            Deadline:
            <input
              type='date'
              className='grow'
              placeholder='Deadline'
              {...register("deadline")}
              defaultValue={task?.deadline.toString()}
            />
          </label>
        </div>
        <div>{errors.deadline && <p>Invalid date!</p>}</div>
        <div className='flex justify-between'>
          <button
            className='btn'
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            Close
          </button>
          <button className='btn btn-primary' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
