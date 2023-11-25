import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { BookingHistory } from "./pages/BookingHistory/BookingHistory";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Index } from "./pages/Index/Index";
import { Login } from "./pages/Login/Login";
import { MeetingRoomList } from "./pages/MeetingRoomList/MeetingRoomList";
import { Menu } from "./pages/Menu/Menu";
import { Register } from "./pages/Register/Register";
import { UpdateInfo } from "./pages/UpdateInfo/UpdateInfo";
import { UpdatePassword } from "./pages/UpdatePassword/UpdatePassword";

const routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
      {
        path: "/",
        element: <Menu />,
        children: [
          {
            path: "/",
            element: <MeetingRoomList />,
          },
          {
            path: "meeting_room_list",
            element: <MeetingRoomList />,
          },
          {
            path: "booking_history",
            element: <BookingHistory />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
