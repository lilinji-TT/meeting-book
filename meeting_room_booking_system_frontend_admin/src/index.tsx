import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Index } from "./pages/Index/Index";
import { Login } from "./pages/Login/Login";
import { Menu } from "./pages/Menu/Menu";
import { UserManage } from "./pages/UserManage/UserManage";

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu></Menu>,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
