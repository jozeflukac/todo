import { Todo } from "../../model";

export type TodoInfoProps = {
  todo: Todo;
};
export default function TodoInfo({ todo }: TodoInfoProps) {
  return (
    <span>
      <b>
        {todo.title}{" "}
        <u>
          <i>{todo.finished && "Finished!"} </i>
        </u>
      </b>
    </span>
  );
}
