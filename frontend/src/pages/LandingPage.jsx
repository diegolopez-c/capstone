import LandingNav from "../components/landing/LandingNav";
import LandingMain from "../components/landing/LandingMain";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ca-black gap-2">
      <LandingNav />
      <LandingMain />
    </div>
  );
}
