type Todo = {
  id: number;
  title: string;
  createdAt?: string;
  finished: boolean;
};

type Task = {
  id?: number;
  todo_id: number;
  title: string;
  description: string;
  deadline: Date;
};

export type { Task, Todo };
