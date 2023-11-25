import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { BookingManage } from "./pages/BookingManage/BookingManage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Index } from "./pages/Index/Index";
import { InfoModify } from "./pages/InfoModify/InfoModify";
import { Login } from "./pages/Login/Login";
import { MeetingRoomManage } from "./pages/MeetingRoomManage/MeetingRoomManage";
import { Menu } from "./pages/Menu/Menu";
import { ModifyMenu } from "./pages/ModifyMenu/ModifyMenu";
import { PasswordModify } from "./pages/PasswordModify/PasswordModify";
import { Statistics } from "./pages/Statistics/Statistics";
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
            path: "/",
            element: <MeetingRoomManage />,
          },
          {
            path: "user_manage",
            element: <UserManage />,
          },
          {
            path: "meeting_room_manage",
            element: <MeetingRoomManage />,
          },
          {
            path: "booking_manage",
            element: <BookingManage />,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
        ],
      },
      {
        path: "/user",
        element: <ModifyMenu />,
        children: [
          { path: "info_modify", element: <InfoModify /> },
          { path: "password_modify", element: <PasswordModify /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
