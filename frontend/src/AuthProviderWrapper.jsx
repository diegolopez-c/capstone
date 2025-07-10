import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProviderWrapper = ({ children }) => {
  const navigate = useNavigate();

  //Redirect to redirect page funciton
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/user-creation");
  };

  return (
    //Auth Wrappper for App component with redirection on login to the redirect page
    <Auth0Provider
      domain={import.meta.env.VITE_ISSUER_BASE_URL}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderWrapper;
