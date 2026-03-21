import { createBrowserRouter } from "react-router";
import Landing from "./features/Landing/Landing";
import NotFound from "./features/NotFound/NotFound";
import LoginForm from "./features/Auth/LoginForm/LoginForm";
import Documents from "./features/Dashboard/components/Documents/Documents";
import App from "./App";
import RegisterForm from "./features/Auth/Register/RegisterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Landing />,
        index: true,
      },
      {
        path: "home",
        element: <Landing />,
        index: true,
      },
      {
        path: "auth",
        lazy: () =>
          import("./features/Auth/layouts/AuthLayout").then((m) => ({
            Component: m.default,
          })),
        children: [
          {
            element: <LoginForm />,
            index: true,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegisterForm />,
          },
        ],
      },
      {
        path: "/dashboard",
        lazy: () =>
          import("./features/Dashboard/Dashboard").then((m) => ({
            Component: m.default,
          })),

        children: [
          {
            path: "documents",
            element: <Documents />,
            index: true,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
