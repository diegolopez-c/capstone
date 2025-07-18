import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@heroui/toast";
import AuthProviderWrapper from "./AuthProviderWrapper.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <AuthProviderWrapper>
          <ToastProvider />
          <App />
        </AuthProviderWrapper>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
