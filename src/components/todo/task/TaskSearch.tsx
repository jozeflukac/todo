import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  title: string;
};
const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();
export type TaskSearchProps = {
  search: (data: any) => void;
};

export default function TaskSearch({ search }: TaskSearchProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data: any) => {
    search(data);
  });
  return (
    <div className='mt-5 mb-5'>
      <form onSubmit={onSubmit}>
        <div className='join m-2'>
          <div>
            <div>
              <input
                className='input input-bordered join-item'
                placeholder='Search'
                type='text'
                {...register("title")}
              />
            </div>
          </div>
          <select className='select select-bordered join-item'>
            <option disabled>Filter</option>
            <option>Title</option>
            <option>Description</option>
          </select>
          <div className='indicator'>
            <button
              className='btn join-item'
              type='submit'
              onClick={() => {
                onSubmit();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
