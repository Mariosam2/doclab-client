import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import router from "./router.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router} />
      <App />
    </HeroUIProvider>
  </StrictMode>,
);
