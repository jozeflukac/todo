import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Todo from "./components/todo/Todo";
import ErrorPage from "./routes/error-page";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/Layout";
import TodoDetail from "./components/todo/TodoDetail";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "todo/:todoId",
          element: <TodoDetail />,
        },
      ],
    },
  ]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
