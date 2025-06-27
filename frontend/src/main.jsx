import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_ISSUER_BASE_URL}
        clientId={import.meta.env.VITE_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </HeroUIProvider>
  </StrictMode>
);
