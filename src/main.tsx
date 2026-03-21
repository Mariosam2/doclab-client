import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toast } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import router from "./router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toast.Provider placement="top end" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
