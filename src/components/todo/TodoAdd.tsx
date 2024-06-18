import { useForm } from "react-hook-form";
import { useApiSend } from "../../api";
import { createTodo } from "../../api/urls/todo";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

type FormData = {
  title: string;
};

export default function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const addMutation = useApiSend(
    createTodo,
    (data: any) => {
      navigate("/todo/" + data.id);
      return data;
    },
    (e: any) => {
      console.log(e);
    },
    [["todos"]]
  );
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data: any) => {
    await addMutation.mutate(data);
    setValue("title", "");
  });

  if (addMutation.isPending) return <div>Sending data...</div>;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='join m-2'>
          <div>
            <div>
              <input
                {...register("title")}
                className='input input-bordered join-item'
                placeholder='Todo Title'
              />
              <p>{errors.title?.message}</p>
            </div>
          </div>
          <div className='indicator'>
            <button className='btn join-item' onClick={() => {}}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
