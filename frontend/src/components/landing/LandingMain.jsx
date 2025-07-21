import React from "react";
import mockup from "../../assets/images/mac-mockup.png";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingMain() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-5/6 flex items-start justify-center gap-2">
      <main className="w-4/5 h-full min-h-5 flex items-center flex-col px-4 rounded-3xl text-center gap-8">
        <h3 className="text-3xl">
          Introducing <span className="text-ca-mint">Clinic</span>
          <span className="text-ca-yellow">All</span>
        </h3>
        <h1 className="text-6xl font-bold">
          Health Made <span className="text-ca-mint">Ea</span>
          <span className="text-ca-yellow">sy</span>
        </h1>
        <h4 className="text-lg w-1/2">
          A comprehensive hospital management platform that empowers patients to
          take control of their health.
        </h4>
        <img className="w-1/3" src={mockup} alt="Mac Mockup Image" />
        {isAuthenticated ? (
          <Button onClick={() => loginWithRedirect()} className="bg-ca-mint">
            Go to your dashboard!
          </Button>
        ) : (
          <Button
            className="bg-ca-mint"
            onClick={() => {
              loginWithRedirect({
                screen_hint: "signup",
              });
            }}
          >
            Click Here To Get Started!
          </Button>
        )}
      </main>
    </div>
  );
}
