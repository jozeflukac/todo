import { Outlet } from "react-router-dom";
import TodoAdd from "./todo/TodoAdd";
import TodoList from "./todo/TodoList";
import TodoSearch from "./todo/TodoSearch";

export default function Layout() {
  return (
    <div className='p-5'>
      <div className='flex flex-col w-full lg:flex-row'>
        <div className='grid card bg-base-300 rounded-box place-items-top p-5'>
          <div>
            <div>
              <TodoAdd />
              <br />
              <TodoSearch />
              <br />
              <TodoList />
            </div>{" "}
          </div>
        </div>
        <div className='divider lg:divider-horizontal'></div>
        <div className='grid flex-grow card bg-base-300 rounded-box place-items-top'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
